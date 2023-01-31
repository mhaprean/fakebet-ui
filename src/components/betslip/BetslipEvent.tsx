import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IBetEvent, removeEvent } from '../../redux/features/betslipSlice';
import { IIgubetMatch } from '../../redux/features/igubetTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { timeFormatService } from '../../services/timeFormaterService';
import FlexBetween from '../atoms/FlexBetween';

interface IPropsBetslipEvent {
  event: IBetEvent;
}

const StyledBetslipEvent = styled(Paper)`
  margin: 3px 0;
  padding: 0;

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
      font-weight: ${(props) => props.theme.typography.fontWeightBold};
    }
  }

  .event-remove {
    svg {
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }

  .event-header,
  .event-body {
    padding: 5px;
  }

  .event-footer {
    background: ${(props) => props.theme.navigation.light};
    padding: 0 5px;
  }
`;

const BetslipEvent = ({ event }: IPropsBetslipEvent) => {
  const betslipState = useAppSelector((rootState) => rootState.betslip);
  const dispatch = useAppDispatch();

  const handleRemoveEvent = () => {
    dispatch(removeEvent({ eventId: event.matchId }));
  };

  return (
    <StyledBetslipEvent className="BetslipEvent" square variant="outlined">
      <FlexBetween className="event-header">
        <div className="market-name">
          {/* <Checkbox className="toggle-event" defaultChecked color="secondary" size="small" /> */}
          <Typography className="Label" variant="body2" noWrap>
            {event.market.formated_market_name || event.market.name}
          </Typography>
        </div>
        <div className="event-date">
          <Typography variant="body2" color={'text.secondary'}>
            {timeFormatService.formatDateForMatchSearch(event.match.start_time)}
          </Typography>
        </div>
      </FlexBetween>
      <Box className="event-body">
        <Box className="event-participants">
          <Typography className="event-team" variant="body2">
            {event.match.competitors.home.name}
          </Typography>
          <Typography className="event-team" variant="body2">
            {event.match.competitors.away.name}
          </Typography>
        </Box>
      </Box>
      <FlexBetween className="event-footer">
        <Typography variant="subtitle2"> {event.outcome_name} </Typography>

        <Box className="event-odds">
          <Typography variant="subtitle2"> {event.odds.toFixed(2)} </Typography>
          <IconButton onClick={handleRemoveEvent} className="event-remove">
            <DeleteIcon />
          </IconButton>
        </Box>
      </FlexBetween>
    </StyledBetslipEvent>
  );
};

export default BetslipEvent;
