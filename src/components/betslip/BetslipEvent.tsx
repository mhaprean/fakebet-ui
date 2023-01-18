import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IIgubetMatch } from '../../redux/features/igubetTypes';
import FlexBetween from '../atoms/FlexBetween';

interface IPropsBetslipEvent {
  match?: IIgubetMatch;
}

const StyledBetslipEvent = styled(Paper)`
  margin: 3px 0;
  padding: 5px;

  .market-name {
    display: flex;
    align-items: center;
  }
  .event-date {
    margin-right: 10px;
  }

  .MuiCheckbox-root,
  .MuiButtonBase-root {
    padding: 0;
  }

  .toggle-event {
    margin-right: 5px;
  }

  .event-team {
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  }

  .event-odds {
    display: flex;
    align-items: center;

    .MuiTypography-subtitle1 {
      font-weight: ${props => props.theme.typography.fontWeightBold};
    }


  }
`;

const BetslipEvent = ({ match }: IPropsBetslipEvent) => {
  return (
    <StyledBetslipEvent className="BetslipEvent" square variant='outlined'>
      <FlexBetween className="event-header">
        <div className="market-name">
          <Checkbox className="toggle-event" defaultChecked color="secondary" size="small" />
          <Typography className="Label" variant="body2" noWrap>
            Full time result - first half
          </Typography>
        </div>
        <div className="event-date">
          <Typography variant="body2" color={'text.secondary'}>
            17/01 19:30
          </Typography>
        </div>
      </FlexBetween>
      <Box className="event-body">
        <Box className="event-participants">
          <Typography className='event-team' variant="body2">Crystal Palace</Typography>
          <Typography className='event-team' variant="body2">Manchester United</Typography>
        </Box>

        <FlexBetween>
          <Typography variant="subtitle2"> {'X (0:1)'} </Typography>

          <Box className='event-odds'>
            <Typography variant="subtitle1"> {'4.55'} </Typography>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        </FlexBetween>
      </Box>
    </StyledBetslipEvent>
  );
};

export default BetslipEvent;
