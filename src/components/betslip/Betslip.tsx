import {
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  SwipeableDrawer,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  Delete as DeleteIcon,
  ExpandLess,
  ExpandMore,
  PostAdd as PostAddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import FlexBetween from '../atoms/FlexBetween';
import classNames from 'classnames';
import { useState } from 'react';
import BetslipEvent from './BetslipEvent';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeStake, clearBetslip } from '../../redux/features/betslipSlice';
import BetslipControlls from './BetslipControlls';

const BetslipMobile = styled(Paper)`
  position: fixed;
  left: 0;
  bottom: 56px;
  padding: 5px 10px;
  width: 100%;
  z-index: 300;

  color: ${(props) => props.theme.palette.primary.contrastText};
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${(props) => props.theme.navigation.main};
  color: ${(props) => props.theme.navigation.text};

  .BetslipInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 90px;
    min-width: 40px;
    align-items: center;
    text-align: center;

    &.isFirst {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const StyledBottomDrawer = styled(SwipeableDrawer)`
  .hehehe {
    height: calc(100% - 70px);
    max-height: none;
    overflow: visible;
  }

  .wrapper {
    top: -56px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: white;
    background: ${(props) => props.theme.palette.background.default};
    position: absolute;
    width: 100%;
    height: calc(100% + 56px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .infos {
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: pink;
      background: ${(props) => props.theme.navigation.main};
      color: ${(props) => props.theme.navigation.text};

      .BetslipInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 90px;
        min-width: 40px;
        align-items: center;
        text-align: center;

        &.isFirst {
          flex-direction: row;
          justify-content: space-between;
        }
      }

      &:after {
        content: '';
        width: 50px;
        height: 5px;
        background: ${(props) => props.theme.palette.primary.main};
        border-radius: 20px;
        position: absolute;
        top: -10px;
        left: calc(50% - 25px);
      }
    }

    .content {
      height: calc(100% - 170px);
      overflow-y: auto;

      .BetslipEvent {
        margin: 5px;
      }

      .MuiButton-root {
        min-width: 30px;
      }
    }
  }
`;

const StyledBetslip = styled('div')`
  max-height: 70vh;
  display: flex;
  flex-direction: column;

  .betslip-header {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.palette.divider};
    padding: 5px;

    background: ${(props) => props.theme.palette.background.paper};
  }

  .betslip-subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 10px;

    background: ${(props) => props.theme.navigation.light};
  }

  .cancel-button {
    padding: 0px 5px;
  }

  .selection-list {
    min-height: 150px;
    overflow: auto;
    background: ${(props) => props.theme.palette.background.paper};
  }


`;

const Betslip = () => {
  const [open, setOpen] = useState(false);

  const betslipState = useAppSelector((rootState) => rootState.betslip);
  const dispatch = useAppDispatch();

  const stake = betslipState.betslip.stake;

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleClearBetslip = () => {
    dispatch(clearBetslip());
  };

  const handleChangeStake = (newStake: number) => {
    dispatch(changeStake({ stake: newStake }));
  };

  // mobile view for the betslip
  if (!isMediumScreen) {
    return (
      <>
        {betslipState.betslip.events.length > 0 && (
          <BetslipMobile className="BetslipMobile" square variant="outlined">
            <div className="BetslipInfo isFirst">
              {!open ? (
                <IconButton color="inherit" onClick={() => setOpen(true)}>
                  <ExpandLess />
                </IconButton>
              ) : (
                <IconButton color="inherit" onClick={() => setOpen(false)}>
                  <ExpandMore />
                </IconButton>
              )}

              <Badge badgeContent={betslipState.betslip.events.length} color="secondary">
                <PostAddIcon color="inherit" />
              </Badge>
            </div>
            <div className="BetslipInfo">
              <Typography className="label" variant="caption">
                Odds
              </Typography>
              <Typography className="value" variant="caption">
                {betslipState.betslip.totalOdds.toFixed(2)}
              </Typography>
            </div>

            <div className="BetslipInfo">
              <Typography className="label" variant="caption">
                Stake
              </Typography>
              <Typography className="value" variant="caption">
                {betslipState.betslip.stake}
              </Typography>
            </div>

            <div className="BetslipInfo">
              <Typography className="label" variant="caption">
                Potential gain
              </Typography>
              <Typography className="value" variant="caption">
                {betslipState.betslip.potentialGain.toFixed(2)} $
              </Typography>
            </div>
          </BetslipMobile>
        )}

        <StyledBottomDrawer
          anchor="bottom"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          ModalProps={{
            keepMounted: true,
          }}
          swipeAreaWidth={0}
          classes={{
            paper: 'hehehe',
          }}
        >
          <div className="wrapper">
            <div className="box">
              <div className="infos">
                <div className="BetslipInfo isFirst">
                  {!open ? (
                    <IconButton color="inherit" onClick={() => setOpen(true)}>
                      <ExpandLess />
                    </IconButton>
                  ) : (
                    <IconButton color="inherit" onClick={() => setOpen(false)}>
                      <ExpandMore />
                    </IconButton>
                  )}

                  <Badge badgeContent={betslipState.betslip.events.length} color="secondary">
                    <PostAddIcon color="inherit" />
                  </Badge>
                </div>

                <div className="BetslipInfo">
                  <Typography className="Label" variant="caption">
                    Odds
                  </Typography>
                  <Typography className="Value" variant="caption">
                    {betslipState.betslip.totalOdds.toFixed(2)}
                  </Typography>
                </div>

                <div className="BetslipInfo">
                  <Typography className="Label" variant="caption">
                    Stake
                  </Typography>
                  <Typography className="Value" variant="caption">
                    {betslipState.betslip.stake}
                  </Typography>
                </div>

                <div className="BetslipInfo">
                  <Typography className="Label" variant="caption">
                    Potential gain
                  </Typography>
                  <Typography className="Value" variant="caption">
                    {betslipState.betslip.potentialGain.toFixed(2)} $
                  </Typography>
                </div>
              </div>
            </div>
            <Box className="selection-list">
              {betslipState.betslip.events.map((event, idx) => (
                <BetslipEvent key={idx} event={event} />
              ))}
            </Box>
            <BetslipControlls
              potentialGain={betslipState.betslip.potentialGain}
              stake={stake}
              totalOdds={betslipState.betslip.totalOdds}
              onChangeStake={handleChangeStake}
            />
          </div>
        </StyledBottomDrawer>
      </>
    );
  }

  return (
    <StyledBetslip className="Betslip">
      <Paper className="betslip-header" variant="elevation" elevation={2} square>
        <Typography variant="subtitle2">Betslip</Typography>
      </Paper>

      <Paper className="betslip-subheader" square variant="outlined">
        <Typography className="events-count" variant="body2">
          Events: {betslipState.betslip.events.length}
        </Typography>
        <Button onClick={handleClearBetslip} className="cancel-button" endIcon={<DeleteIcon />}>
          Cancel
        </Button>
      </Paper>

      <Box className="selection-list">
        {betslipState.betslip.events.map((event, idx) => (
          <BetslipEvent key={idx} event={event} />
        ))}
      </Box>
      <BetslipControlls
        potentialGain={betslipState.betslip.potentialGain}
        stake={stake}
        totalOdds={betslipState.betslip.totalOdds}
        onChangeStake={handleChangeStake}
      />
    </StyledBetslip>
  );
};

export default Betslip;
