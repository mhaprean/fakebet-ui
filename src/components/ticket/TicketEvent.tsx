import { Paper, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IStrapiBet } from '../../redux/features/strapiApi';
import { timeFormatService } from '../../services/timeFormaterService';
import SportIcon from '../sport/SportIcon';

import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';
import classNames from 'classnames';

interface IPropsTicketEvent {
  bet: IStrapiBet;
}

const StyledTicketEvent = styled(Paper)`
  margin-top: -1px;
  padding: 5px;

  &.isWin {
    border-left: 2px solid ${(props) => props.theme.palette.success.main};
  }
  &.isLost {
    border-left: 2px solid ${(props) => props.theme.palette.error.main};
  }

  .event-header {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.primary.light};
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    .event-category {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    }

    .SportIcon {
      font-size: 14px;
      margin-right: 5px;
    }
  }

  .event-body {
    display: flex;
    margin: 10px 0;

    .event-time {
      max-width: 40px;
      color: ${(props) => props.theme.palette.text.secondary};
    }

    .team {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    }

    .info {
      display: flex;
      flex-direction: column;
    }
  }

  .validation-result {
    display: flex;
    align-items: center;

    .win {
      color: ${(props) => props.theme.palette.success.main};
    }
    .lost {
      color: ${(props) => props.theme.palette.error.main};
    }
  }
  .Odds {
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .event-footer {
    display: flex;
    align-items: center;
    /* color: ${(props) => props.theme.palette.primary.light}; */
    margin-top: 5px;

    img {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
      margin-right: 5px;
    }

    .PeriodName {
      /* color: ${(props) => props.theme.palette.text.secondary}; */
      margin-left: auto;
    }
    .OddLeague {
      margin-left: 10px;
    }

    .market-name {
      /* color: ${(props) => props.theme.palette.text.secondary}; */
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
      margin-right: 10px;
    }

    .odd-name {
      margin-left: auto;
    }

    .odd-value {
      margin-right: 5px;
      margin-left: 10px;
      /* color: ${(props) => props.theme.palette.text.primary}; */
      font-weight: ${(props) => props.theme.typography.fontWeightBold};
      flex-shrink: 0;

      &.isWin {
        color: ${(props) => props.theme.palette.success.main};
      }
      &.isLost {
        color: ${(props) => props.theme.palette.error.main};
      }
    }
  }

  .teams {
    overflow: auto;
  }

  .Periods {
    margin-left: auto;
    flex-shrink: 0;
    margin-right: 5px;

    display: flex;

    .Period {
      color: ${(props) => props.theme.palette.text.disabled};
      margin: 0 2px;
      text-align: center;

      &.Final {
        color: ${(props) => props.theme.palette.text.primary};
      }
    }

    .Score {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    }
  }
`;

const TicketEvent = ({ bet }: IPropsTicketEvent) => {
  return (
    <StyledTicketEvent className="TicketEvent" square variant="outlined">
      <div className="event-header">
        <SportIcon sportSlug={bet.attributes.sport_key} />
        <Typography className="event-category" variant="body2" noWrap component="span">
          {bet.attributes.category_name} {` / `} {bet.attributes.tournament_name}
        </Typography>
      </div>
      <div className="event-body">
        <div className="event-time">
          <Typography className="" variant="caption" component="div">
            {timeFormatService.formatDateForTicket(bet.attributes.match_date)}
          </Typography>
        </div>
        <div className="teams">
          <Typography className="team" variant="caption" noWrap component="div">
            {bet.attributes.home_team}
          </Typography>
          <Typography className="team" variant="caption" noWrap component="div">
            {bet.attributes.away_team}
          </Typography>
        </div>

        <div className="Periods">
          {bet.attributes.match.data.attributes.period_score &&
            bet.attributes.match.data.attributes.period_score.map((period, idx) => (
              <Tooltip title={period.period_name} placement="top" key={idx}>
                <div className="Period">
                  <Typography className="Score" variant="caption" noWrap component="div">
                    {period.home}
                  </Typography>
                  <Typography className="Score" variant="caption" noWrap component="div">
                    {period.away}
                  </Typography>
                </div>
              </Tooltip>
            ))}

          {bet.attributes.is_validated && (
            <Tooltip title={'Final Score'} placement="top">
              <div className="Period Final">
                <Typography className="Score" variant="caption" noWrap component="div">
                  {bet.attributes.match.data.attributes.total_score?.home}
                </Typography>
                <Typography className="Score" variant="caption" noWrap component="div">
                  {bet.attributes.match.data.attributes.total_score?.away}
                </Typography>
              </div>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="event-footer">
        <Typography className="market-name" variant="body2" component="span">
          {bet.attributes.market_name}
        </Typography>

        <Typography className="odd-name" variant="body2" noWrap component="span">
          {bet.attributes.outcome_name}
        </Typography>

        <Typography
          className={classNames('odd-value', {
            isWin: bet.attributes.is_validated && bet.attributes.is_winner,
            isLost: bet.attributes.is_validated && !bet.attributes.is_winner,
          })}
          variant="body2"
          noWrap
          component="span"
        >
          @ {parseFloat('' + bet.attributes.outcome_odds).toFixed(2)}
        </Typography>

        <div className="validation-result">
          {bet.attributes.is_validated && bet.attributes.is_winner && (
            <CheckCircleIcon className="win" fontSize="small" />
          )}
          {bet.attributes.is_validated && !bet.attributes.is_winner && (
            <CancelIcon className="lost" fontSize="small" />
          )}
        </div>
      </div>
    </StyledTicketEvent>
  );
};

export default TicketEvent;
