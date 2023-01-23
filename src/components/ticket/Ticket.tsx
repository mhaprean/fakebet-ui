import { Button, Chip, Paper, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { IStrapiTicket } from '../../redux/features/strapiApi';

import {
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  HelpOutline as HelpOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
  FileCopy as FileCopyIcon,
} from '@mui/icons-material';
import classNames from 'classnames';
import { timeFormatService } from '../../services/timeFormaterService';
import TicketEvent from './TicketEvent';

interface IPropsTicket {
  ticket: IStrapiTicket;
  myTicket?: boolean;
  isSlide?: boolean;
}

const StyledTicket = styled('div')`
  margin-bottom: 10px;


  .ticket-header {
    margin-bottom: 1px;
    padding: 2px;
    border-bottom: none;

    &.isWinner {
      /* border-bottom: 2px solid ${(props) => props.theme.palette.success.light}; */
      /* background: ${(props) => alpha(props.theme.palette.success.light, 0.1)}; */
    }
    &.isLost {
      /* border-bottom: 2px solid ${(props) => props.theme.palette.error.light}; */
      /* background: ${(props) => alpha(props.theme.palette.error.main, 0.1)}; */
    }
  }

  .user-chip {
    margin-left: auto;
    cursor: pointer;
  }
  .ticket-subheader {
    padding: 5px;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .subheader-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .label {
      color: ${(props) => props.theme.palette.text.secondary};
    }
    .value {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    }
  }

  .TicketDivider {
    background: ${(props) => props.theme.palette.warning.main};
    /* margin-top: 5px;
    margin-bottom: 10px; */

    &.isWinner {
      background: ${(props) => props.theme.palette.success.main};
    }
    &.isLost {
      background: ${(props) => props.theme.palette.error.main};
    }
  }

  .chips {
    display: flex;
    flex-wrap: wrap;

    .PotentialGain {
      margin: 2px;
      margin-left: auto;

      &.Pending {
        border: 1px solid ${(props) => props.theme.palette.warning.main};
        background: ${(props) => alpha(props.theme.palette.warning.main, 0.1)};
      }

      &.Winner {
        border: 1px solid ${(props) => props.theme.palette.success.main};
        background: ${(props) => alpha(props.theme.palette.success.main, 0.1)};
      }
      &.Lost {
        border: 1px solid ${(props) => props.theme.palette.error.main};
        background: ${(props) => alpha(props.theme.palette.error.main, 0.1)};
      }
    }

    .match-chip {
      background: ${(props) =>
        props.theme.palette.mode === 'light'
          ? props.theme.navigation.light
          : props.theme.palette.background.default};

      color: ${(props) => props.theme.palette.text.secondary};
      margin: 2px;

      &.Pending {
        background: ${(props) => props.theme.palette.warning.main};
        color: ${(props) => props.theme.palette.warning.contrastText};

        svg {
          color: ${(props) => props.theme.palette.warning.contrastText};
        }
      }
      &.Win {
        background: ${(props) => props.theme.palette.success.main};
        color: ${(props) => props.theme.palette.success.contrastText};

        svg {
          color: ${(props) => props.theme.palette.success.contrastText};
        }
      }
      &.Lost {
        background: ${(props) => props.theme.palette.error.main};
        color: ${(props) => props.theme.palette.error.contrastText};

        svg {
          color: ${(props) => props.theme.palette.error.contrastText};
        }
      }
    }
  }

  .ticket-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: ${(props) => props.theme.palette.background.default}; */
    padding: 2px;
    padding-left: 5px;

    .label {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    }

    .copy-button {
      font-size: 12px;
      padding: 2px 5px;
      margin-left: auto;
      text-transform: none;
      background-color: ${(props) => props.theme.palette.background.default};

      color: ${(props) => props.theme.palette.text.secondary};
      border: 0;
    }
  }
`;

const Ticket = ({ ticket, myTicket = false, isSlide = false }: IPropsTicket) => {
  const handleCopyTicket = () => {};
  return (
    <StyledTicket className="Ticket">
      <Paper
        className={classNames('ticket-header', {
          isWinner: ticket.attributes.is_validated && ticket.attributes.is_winner,
          isLost: ticket.attributes.is_validated && !ticket.attributes.is_winner,
        })}
        square
        variant="outlined"
      >
        <div className="chips">
          <Chip
            className="match-chip"
            size="small"
            icon={<AccessTimeIcon />}
            label={timeFormatService.formatDateForTicket(ticket.attributes.createdAt)}
          />

          {!ticket.attributes.is_validated && (
            <Chip
              className="match-chip Pending"
              size="small"
              icon={<HelpOutlineIcon className="Pending" fontSize="small" />}
              label={'Pending'}
            />
          )}

          {ticket.attributes.is_validated && ticket.attributes.is_winner && (
            <Chip
              className="match-chip Win"
              size="small"
              icon={<CheckCircleOutlineIcon fontSize="small" />}
              label={'Win'}
            />
          )}

          {ticket.attributes.is_validated && !ticket.attributes.is_winner && (
            <Chip
              className="match-chip Lost"
              size="small"
              icon={<HighlightOffIcon fontSize="small" />}
              label={'Lost'}
            />
          )}

          {!myTicket && (
            <Link className="user-chip" to={`/players/${ticket.attributes.user.data.id}`}>
              <Chip
                className="match-chip"
                size="small"
                icon={<PersonIcon fontSize="small" />}
                label={ticket.attributes.user.data.attributes.username}
              />
            </Link>
          )}


          {/* {myTicket && !ticket.attributes.is_validated && (
            <Chip
              className="PotentialGain Pending"
              size="small"
              label={parseFloat(ticket.attributes.stake + '').toFixed(2)}
            />
          )}

          {myTicket && ticket.attributes.is_validated && ticket.attributes.is_winner && (
            <Chip
              className="PotentialGain Winner"
              size="small"
              label={'+ ' + parseFloat(ticket.attributes.potential_gain + '').toFixed(2)}
            />
          )}

          {myTicket && ticket.attributes.is_validated && !ticket.attributes.is_winner && (
            <Chip
              className="PotentialGain Lost"
              size="small"
              label={'- ' + parseFloat(ticket.attributes.stake + '').toFixed(2)}
            />
          )} */}
        </div>

        <div className="ticket-subheader">
          <div className="subheader-info">
            <Typography className="label" variant="caption">
              Stake
            </Typography>
            <Typography className="value"variant="subtitle1">
              {ticket.attributes.stake} $
            </Typography>
          </div>
          <div className="subheader-info">
            <Typography className="label" variant="caption">
              Odds
            </Typography>
            <Typography className="value"variant="subtitle1">
              {ticket.attributes.total_odds}
            </Typography>
          </div>

          <div className="subheader-info">
            <Typography className="label" variant="caption">
              Potential gain
            </Typography>
            <Typography className="value"variant="subtitle1" style={{ marginLeft: 'auto' }}>
              {ticket.attributes.potential_gain} $
            </Typography>
          </div>
        </div>

        <div className="ticket-action">
          <Typography className="label" variant="caption">
            {ticket.attributes.bets.data.length > 1
              ? `${ticket.attributes.bets.data.length} Events`
              : '1 Event'}
          </Typography>

          {/* {!ticket.attributes.is_validated && (
            <Button
              onClick={handleCopyTicket}
              className="copy-button"
              size="small"
              variant="outlined"
              startIcon={<FileCopyIcon />}
            >
              Copy Ticket
            </Button>
          )} */}
        </div>
      </Paper>

      <div className="TicketBody">
        {ticket.attributes.bets.data.map((bet, idx) => {
          return <TicketEvent key={idx} bet={bet} />;
        })}
      </div>
    </StyledTicket>
  );
};

export default Ticket;
