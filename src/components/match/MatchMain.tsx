import { Chip, Divider, IconButton, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IStrapiMatch } from '../../redux/features/strapiApi';

import {
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { timeFormatService } from '../../services/timeFormaterService';
import SportIcon from '../SportIcon';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../atoms/ImageWithFallback';
import classNames from 'classnames';

export interface IPropsMatchMain {
  match: IStrapiMatch;
}

const StyledMatchMain = styled(Paper)`
  padding: 5px;
  .Header {
    display: flex;
    align-items: center;

    .Image {
      width: 45px;
      height: 45px;
      background: ${(props) => props.theme.palette.background.default};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      border: 2px solid ${(props) => props.theme.palette.background.paper};
      z-index: 1;
      flex-shrink: 0;

      img {
        width: 25px;
        height: 25px;
        flex-shrink: 0;
      }
    }

    .Image2 {
      margin-left: -10px;
      z-index: 0;
      margin-right: 5px;
      flex-shrink: 0;
    }
  }

  .SportName {
    margin-left: auto;
  }

  .Top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .Chips {
      display: flex;
      flex-wrap: wrap;

      .MatchChip {
        background: ${(props) => props.theme.palette.background.default};
        color: ${(props) => props.theme.palette.text.secondary};
        margin: 2px;

        svg {
          font-size: 18px;
          margin-left: 4px;
        }

      }
    }
  }

  .MatchDivider {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .Subtitle {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .ShowChart {
      font-size: 15px;
      margin-right: 5px;
    }
  }

  .League {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .LeagueImage {
      width: 15px;
      height: 15px;
      border-radius: 30px;
      background: #fff;
      margin-right: 5px;
      display: flex;
      align-items: center;

      img {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
      }
    }
  }

  .Teams {
    overflow: hidden;

    .isWinner {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
      color: ${(props) => props.theme.palette.text.primary};
    }
    .isLoser {
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }
  .Score {
    flex-shrink: 0;
    margin-left: auto;
    padding-right: 10px;
    padding-left: 10px;
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  }
`;

const MatchMain = ({ match }: IPropsMatchMain) => {
  return (
    <StyledMatchMain className="MatchMain" variant="outlined">
      <div className="Top">
        <div className="Chips">
          <Chip
            className="MatchChip"
            size="small"
            icon={<AccessTimeIcon />}
            label={timeFormatService.formatDateForMatchSearch(match.start_time || '')}
          />
          <Chip
            className="MatchChip"
            size="small"
            icon={<SportIcon sportSlug={match.sport_key} />}
            label={match.sport_key}
          />
        </div>
        <div className="FavoriteBtn">
          <Link
            to={`/sports/${match.sport_key}/league/${match.tournament_id}/event/${match.igu_id}`}
            style={{ textDecoration: 'none' }}
          >
            <IconButton
              style={{ marginLeft: 'auto' }}
              size="small"
              className="favouriteButton"
              onClick={() => {}}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Link>
        </div>
      </div>

      <div className="Header">
        <div className="Image">
          <ImageWithFallback image={`${match.home_logo}`} type="team" />
        </div>

        <div className="Image Image2">
          <ImageWithFallback image={`${match.away_logo}`} type="team" />
        </div>

        <div className="Teams">
          <Typography
            noWrap
            variant="body2"
            className={classNames({
              isWinner: match.total_score && match.total_score.home > match.total_score.away,
              isLoser: match.total_score && match.total_score.home < match.total_score.away,
            })}
          >
            {match.home_team}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            className={classNames({
              isWinner: match.total_score && match.total_score.home < match.total_score.away,
              isLoser: match.total_score && match.total_score.home > match.total_score.away,
            })}
          >
            {match.away_team}
          </Typography>
        </div>

        <div className="Score">
          <Typography noWrap variant="subtitle2">
            {match?.total_score?.home}
          </Typography>
          <Typography noWrap variant="subtitle2">
            {match?.total_score?.away}
          </Typography>
        </div>
      </div>

      <div className="League">
        <div className="LeagueImage">
          <ImageWithFallback
            image={`https://cdn.oddspedia.com/images/categories/${match.category_slug}.svg`}
            type="league"
          />
        </div>
        <Typography noWrap variant="subtitle2" style={{ marginRight: 'auto' }}>
          {match.category_name}
        </Typography>

        <Typography noWrap variant="subtitle2">
          {match.tournament_name}
        </Typography>
      </div>

      <Divider className="MatchDivider" />

      <div className="Subtitle">
        <ShowChartIcon className="ShowChart" />
        <Typography noWrap variant="subtitle2">
          {match.tickets?.data.length === 1 ? '1 ticket' : match.tickets?.data.length + ' tickets'}
        </Typography>
      </div>
    </StyledMatchMain>
  );
};

export default MatchMain;
