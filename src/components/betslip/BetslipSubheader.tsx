import { Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon } from '@mui/icons-material';

const StyledBetslipSubheader = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 10px;

  background: ${(props) => props.theme.navigation.light};

  .cancel-button {
    padding: 0px 5px;
  }
`;

interface IPropsBetslipSubheader {
  eventsNr: number;
  onClear: () => void;
}

const BetslipSubheader = ({ eventsNr, onClear }: IPropsBetslipSubheader) => {
  return (
    <StyledBetslipSubheader className="BetslipSubheader" variant="outlined" square>
      <Typography className="events-count" variant="body2">
        Events: {eventsNr}
      </Typography>
      <Button onClick={onClear} className="cancel-button" endIcon={<DeleteIcon />}>
        Cancel
      </Button>
    </StyledBetslipSubheader>
  );
};

export default BetslipSubheader;
