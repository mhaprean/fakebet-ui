import { Badge, IconButton, Typography } from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandLess,
  ExpandMore,
  PostAdd as PostAddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface IPropsBetslipMobilePreview {
  potentialGain: number;
  stake: number;
  totalOdds: number;
  eventsNr: number;
}

const StyledBetslipMobilePreview = styled('div')`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.navigation.main};
  color: ${(props) => props.theme.navigation.text};
  width: 100%;

  .betslip-info {
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

interface IPropsBetslipMobilePreview {
  open: boolean;
  setOpen: (val: boolean) => void;
  eventsNr: number;
  potentialGain: number;
  totalOdds: number;
  stake: number;
}

const BetslipMobilePreview = ({
  eventsNr,
  potentialGain,
  totalOdds,
  stake,
  open,
  setOpen,
}: IPropsBetslipMobilePreview) => {
  return (
    <StyledBetslipMobilePreview className="BetslipMobilePreview">
      <div className="betslip-info isFirst">
        {!open ? (
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <ExpandLess />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={() => setOpen(false)}>
            <ExpandMore />
          </IconButton>
        )}

        <Badge badgeContent={eventsNr} color="secondary">
          <PostAddIcon color="inherit" />
        </Badge>
      </div>

      <div className="betslip-info">
        <Typography className="Label" variant="caption">
          Odds
        </Typography>
        <Typography className="Value" variant="caption">
          {totalOdds.toFixed(2)}
        </Typography>
      </div>

      <div className="betslip-info">
        <Typography className="Label" variant="caption">
          Stake
        </Typography>
        <Typography className="Value" variant="caption">
          {stake}
        </Typography>
      </div>

      <div className="betslip-info">
        <Typography className="Label" variant="caption">
          Potential gain
        </Typography>
        <Typography className="Value" variant="caption">
          {potentialGain.toFixed(2)} $
        </Typography>
      </div>
    </StyledBetslipMobilePreview>
  );
};

export default BetslipMobilePreview;
