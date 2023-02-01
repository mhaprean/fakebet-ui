import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Paper, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { IBetEvent, removeEvent } from '../../redux/features/betslipSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { timeFormatService } from '../../services/timeFormaterService';
import FlexBetween from '../atoms/FlexBetween';
import WarningIcon from '@mui/icons-material/Warning';
import SportIcon from '../SportIcon';

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

  .event-date {
    display: flex;
    align-items: center;

    .SportIcon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  .event-ended {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.error.main};
    .warning {
      margin-right: 10px;
    }
  }

  .event-footer {
    background: ${(props) => alpha(props.theme.navigation.light, 0.5)};
    padding: 0 5px;
    border-top: 1px solid ${(props) => props.theme.palette.divider};
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
        {timeFormatService.isPastDate(event.match.start_time) ? (
          <div className="event-ended">
            <WarningIcon className="warning" sx={{ width: 20, height: 20 }} />
            <Typography className="Label" variant="caption" noWrap>
              {'Event is no longer available'}
            </Typography>
          </div>
        ) : (
          <div className='event-date'>
            <SportIcon sportSlug={event.match.tournament.sport.key} />
            <Typography variant="body2" color={'text.secondary'}>
              {timeFormatService.formatDateForBetslipEvent(event.match.start_time)}
            </Typography>
          </div>
        )}

        <IconButton onClick={handleRemoveEvent} className="event-remove" size="small">
          <DeleteIcon sx={{ width: 20, height: 20 }} />
        </IconButton>
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

      {!timeFormatService.isPastDate(event.match.start_time) && (
        <FlexBetween className="event-footer">
          <Typography variant="caption"> {event.market_name} </Typography>

          <Box className="event-odds">
            <Typography variant="subtitle2" noWrap>
            {event.outcome_name} @ {event.odds.toFixed(2)}
            </Typography>
          </Box>
        </FlexBetween>
      )}
    </StyledBetslipEvent>
  );
};

export default BetslipEvent;
