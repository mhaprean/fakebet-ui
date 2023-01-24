import { Button, Paper, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { sportList } from '../../helpers/oddspediaSports';
import { IIgubetMatch } from '../../redux/features/igubetTypes';
import { transformIgubetMarkets, transformIguSingleMarket } from '../../services/igubetTransformer';
import { timeFormatService } from '../../services/timeFormaterService';
import ImageWithFallback from '../atoms/ImageWithFallback';
import SportIcon from '../SportIcon';
import Market from './Market';
import MarketOutcomes from './MarketOutcomes';

export interface IPropsMatch {
  match: IIgubetMatch;
}

const StyledMatch = styled(Paper)`
  margin-top: 10px;
  padding: 5px;
  padding-top: 0;

  .match-header {
    display: flex;
    align-items: center;

    .SportIcon {
      width: 15px;
      height: 15px;
      margin: 5px;
      color: ${(props) => props.theme.palette.primary.light};
    }
  }

  .match-body {
    display: flex;
    flex-direction: row;
    padding: 0;
    align-items: stretch;

    ${(props) => props.theme.breakpoints.up('sm')} {
      align-items: stretch;
    }
  }

  .teams,
  .scores {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
    padding: 3px;
  }

  .team {
    display: flex;
    margin: 2px 0;
    flex-shrink: 0;

    .team-name {
      color: ${(props) => alpha(props.theme.palette.text.primary, 0.9)};
    }

    .isWinner {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
      color: ${(props) => props.theme.palette.text.primary};
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      flex-shrink: 0;
    }
  }

  .teams {
    margin-right: auto;
  }

  .periods {
    display: flex;
    align-items: center;

    .scores {
      margin-right: 5px;
      height: 100%;

      .score {
        text-align: center;

        .MuiTypography-root {
          font-weight: ${(props) => props.theme.typography.fontWeightMedium};
          color: ${(props) => props.theme.palette.text.secondary};
        }
      }
    }
  }

  .scores {
    margin-right: 5px;

    .score {
      text-align: center;

      .MuiTypography-root {
        font-weight: ${(props) => props.theme.typography.fontWeightMedium};
      }
    }
  }
  .more,
  .time {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    min-width: 50px;
  }

  .more {
    padding: 0 5px;
  }

  .time {
    min-width: 40px;
    max-width: 50px;

    .MuiTypography-root {
      text-align: center;
    }
  }

  .match-footer {
    .MarketOutcomes {
      margin-bottom: 0;
    }
  }
`;

const Match = ({ match }: IPropsMatch) => {
  return (
    <StyledMatch className="Match" variant="outlined" elevation={0}>
      <div className="match-header">
        <SportIcon sportSlug={match.tournament.sport.key || ''} />
        <Typography noWrap variant="caption">
          {timeFormatService.formatMatchDate(match.start_time)}
        </Typography>
      </div>
      <div className="match-body">
        <div className="time">
          <Typography variant="caption">{timeFormatService.formatMatchTime(match.start_time)}</Typography>
        </div>
        <div className="teams">
          <div className="team">
            <ImageWithFallback image={`${match.competitors.home.logo}`} type="team" />

            <Typography
              noWrap
              variant="body2"
              className={classNames('team-name', { isWinner: match.winner === 1 })}
            >
              {match.competitors.home.name}
            </Typography>
          </div>
          <div className="team">
            <ImageWithFallback image={`${match.competitors.away.logo}`} type="team" />

            <Typography
              noWrap
              variant="body2"
              className={classNames('team-name', { isWinner: match.winner === 2 })}
            >
              {match.competitors.away.name}
            </Typography>
          </div>
        </div>

        <div className="periods">
          {match.statistics.period_score &&
            match.statistics.period_score.length > 0 &&
            match.statistics.period_score.map((period, idx) => (
              <div className="scores" key={idx}>
                <div className="score">
                  <Typography variant="body2">{period.home}</Typography>
                </div>
                <div className="score">
                  <Typography variant="body2">{period.away}</Typography>
                </div>
              </div>
            ))}
        </div>

        <div className="scores">
          {match.statistics.period_score !== null && match.statistics.total_score !== null && (
            <>
              <div className="score">
                <Typography variant="body2">{match.statistics.total_score.home}</Typography>
              </div>
              <div className="score">
                <Typography variant="body2">{match.statistics.total_score.away}</Typography>
              </div>
            </>
          )}
        </div>
        <div className="more">
          <Link
            to={`/sports/${match.tournament.sport.key}/league/${match.tournament.id}/event/${match.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button className="seeAllButton" size="small" title={'See all'}>
              +See all
            </Button>
          </Link>
        </div>
      </div>
      <div className="match-footer">
        {match.main_market && (
          <MarketOutcomes match={match} market={transformIguSingleMarket(match.main_market)} />
        )}
      </div>
    </StyledMatch>
  );
};

export default Match;
