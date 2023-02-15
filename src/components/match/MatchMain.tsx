import { Chip, Divider, IconButton, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IStrapiBet, IStrapiMatch } from '../../redux/features/strapiApi';

import {
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';
import { timeFormatService } from '../../services/timeFormaterService';
import SportIcon from '../sport/SportIcon';
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
        &.sport-chip {
          cursor: pointer;
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

  .Bet {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .Left,
    .Right {
      display: flex;
      align-items: center;

      .OddValue {
        color: ${(props) => props.theme.palette.primary.main};
        margin-left: 10px;

        &.isWin {
          color: ${(props) => props.theme.palette.success.main};
        }
        &.isLost {
          color: ${(props) => props.theme.palette.error.main};
        }
      }
    }
  }
`;

interface IGroupedBet {
  bet: IStrapiBet;
  betKey: string;
  total: number;
}

const MatchMain = ({ match }: IPropsMatchMain) => {
  const compactMatchBets = (bets: IStrapiBet[]) => {
    const results: { [key: string]: IGroupedBet } = {};

    bets.forEach((bet, idx) => {
      const betKey = `${bet.attributes.outcome_name}-${bet.attributes.outcome_id}`;

      const existingBet = results[betKey];

      if (!existingBet) {
        results[betKey] = {
          bet: bet,
          betKey: betKey,
          total: 1,
        };
      } else {
        results[betKey] = {
          ...existingBet,
          total: existingBet.total + 1,
        };
      }
    });

    const sortableBets = [];

    for (const objKey in results) {
      sortableBets.push(results[objKey]);
    }

    sortableBets.sort((a, b) => b.total - a.total);

    return sortableBets;
  };

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
          <Link to={`/offer`}>
            <Chip
              className="MatchChip sport-chip"
              size="small"
              icon={<SportIcon sportSlug={match.sport_key} />}
              label={match.sport_key}
            />
          </Link>
        </div>
        <div className="FavoriteBtn">
          <Link
            to={`/offer/league/${match.tournament_id}/event/${match.igu_id}`}
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

      <div className="Footer">
        {compactMatchBets(match?.bets?.data || [])
          .slice(0, 3)
          .map((groupedBet, idx) => {
            const bet = groupedBet.bet;

            return (
              <div key={idx} className="Bet">
                <div className="Left">
                  {groupedBet.total > 1 && <Typography variant="caption">({groupedBet.total}) </Typography>}
                  <Typography variant="caption">{bet.attributes.market_name}</Typography>
                </div>
                <div className="Right">
                  <Typography noWrap variant="subtitle2">
                    {bet.attributes.outcome_name}
                  </Typography>

                  <Typography
                    className={classNames('OddValue', {
                      isWin: bet.attributes.is_validated && bet.attributes.is_winner,
                      isLost: bet.attributes.is_validated && !bet.attributes.is_winner,
                    })}
                    noWrap
                    variant="subtitle2"
                  >
                    @ {parseFloat(bet.attributes.outcome_odds + '').toFixed(2)}
                  </Typography>
                </div>
              </div>
            );
          })}

        {match.bets?.data && match.bets.data.length > 3 && (
          <div className="Bet">
            <Typography noWrap variant="subtitle1">
              ...
            </Typography>
          </div>
        )}
      </div>
    </StyledMatchMain>
  );
};

export default MatchMain;
