import { Box, Paper, SwipeableDrawer, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import BetslipEvent from './BetslipEvent';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeStake, clearBetslip } from '../../redux/features/betslipSlice';
import BetslipControlls from './BetslipControlls';
import BetslipSubheader from './BetslipSubheader';
import BetslipMobilePreview from './BetslipMobilePreview';

const BetslipMobile = styled(Paper)`
  position: fixed;
  left: 0;
  bottom: 56px;
  padding: 0;
  width: 100%;
  z-index: 300;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${(props) => props.theme.navigation.main};
  color: ${(props) => props.theme.navigation.text};
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

    .BetslipControlls {
      padding: 5px 5px 20px;
    }

    .selection-list {
      height: 100%;
      overflow: auto;
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
            <BetslipMobilePreview
              open={open}
              setOpen={setOpen}
              totalOdds={betslipState.betslip.totalOdds}
              potentialGain={betslipState.betslip.potentialGain}
              stake={betslipState.betslip.stake}
              eventsNr={betslipState.betslip.events.length}
            />
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
            <BetslipMobilePreview
              open={open}
              setOpen={setOpen}
              totalOdds={betslipState.betslip.totalOdds}
              potentialGain={betslipState.betslip.potentialGain}
              stake={betslipState.betslip.stake}
              eventsNr={betslipState.betslip.events.length}
            />

            <BetslipSubheader eventsNr={betslipState.betslip.events.length} onClear={handleClearBetslip} />

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

      <BetslipSubheader eventsNr={betslipState.betslip.events.length} onClear={handleClearBetslip} />

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
