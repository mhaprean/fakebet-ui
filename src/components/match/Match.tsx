import { Button, Paper, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { sportList } from '../../helpers/oddspediaSports';
import { IOddspediaMatch } from '../../redux/features/oddspediaTypes';
import { timeFormatService } from '../../services/timeFormaterService';
import SportIcon from '../SportIcon';

export interface IPropsMatch {
  match: IOddspediaMatch;
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

  .scores {
    margin-left: auto;
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
`;

const Match = ({ match }: IPropsMatch) => {
  const matchSport = sportList[match.sport_id];

  return (
    <StyledMatch className="Match" variant="outlined" elevation={0}>
      <div className="match-header">
        <SportIcon sportSlug={matchSport.slug || ''} />
        <Typography noWrap variant="caption">
          {timeFormatService.formatMatchDate(match.md)}
        </Typography>
      </div>
      <div className="match-body">
        <div className="time">
          <Typography variant="caption">{timeFormatService.getMatchTime(match)}</Typography>
        </div>
        <div className="teams">
          <div className="team">
            <img
              src={`https://cdn.oddspedia.com/images/teams/medium/${match.sport_id}/${match.ht_id}.png`}
              alt=""
            />
            <Typography
              noWrap
              variant="body2"
              className={classNames('team-name', { isWinner: match.winner === 1 })}
            >
              {match.ht}
            </Typography>

            {match.ht_red_cards
              ? [...Array(match.ht_red_cards)].map((e, i) => (
                  <div key={'redcard' + i} className="match__teams__team__red-card"></div>
                ))
              : null}
          </div>
          <div className="team">
            <img
              src={`https://cdn.oddspedia.com/images/teams/medium/${match.sport_id}/${match.at_id}.png`}
              alt=""
            />
            <Typography
              noWrap
              variant="body2"
              className={classNames('team-name', { isWinner: match.winner === 2 })}
            >
              {match.at}
            </Typography>

            {match.at_red_cards
              ? [...Array(match.at_red_cards)].map((e, i) => (
                  <div key={'redcard' + i} className="match__teams__team__red-card"></div>
                ))
              : null}
          </div>
        </div>
        <div className="scores">
          <div className="score">
            <Typography variant="body2">{match.hscore}</Typography>
          </div>
          <div className="score">
            <Typography variant="body2">{match.ascore}</Typography>
          </div>
        </div>
        <div className="more">
          <Link to={`/sports/${matchSport.slug}/event/${match.id}`} style={{ textDecoration: 'none' }}>
            <Button className="seeAllButton" size="small" title={'See all'}>
              +See all
            </Button>
          </Link>
        </div>
      </div>
      <div className="match-footer"></div>
    </StyledMatch>
  );
};

export default Match;
