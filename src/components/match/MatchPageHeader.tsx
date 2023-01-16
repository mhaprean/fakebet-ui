import { useCountdown } from '../../hooks/useCountdown';
import { IOddspediaMatchInfo } from '../../redux/features/oddspediaTypes';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import { timeFormatService } from '../../services/timeFormaterService';
import RecentForm from './RecentForm';
import { IIgubetMatch } from '../../redux/features/igubetTypes';

interface IPropsMatchPageHeader {
  match: IIgubetMatch | null;
}

const StyledMatchPageHeader = styled('div')`
  background: ${(props) => props.theme.palette.background.paper};
  margin-top: 10px;
  .content {
    padding: 10px;
  }

  .MuiTypography-root {
    margin: 0;
    text-align: center;
  }

  .event-league {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;

    img {
      margin-right: 10px;
    }
    p {
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};
    }
  }

  .event-container {
    display: flex;
    justify-content: center;

    margin-bottom: 10px;

    .team {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      flex-direction: column;
      width: 40%;

      &.home-team {
        flex-direction: column-reverse;
        justify-content: flex-end;
      }

      .team-image {
        width: 65px;
        height: 65px;
        background: ${(props) => props.theme.palette.background.default};
        border-radius: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        border: 1px solid ${(props) => props.theme.palette.divider};

        img {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          /* margin: 10px; */
        }
      }
    }

    ${(props) => props.theme.breakpoints.up('sm')} {
      .team,
      .team.home-team {
        flex-direction: row;

        .team-image {
          width: 75px;
          height: 75px;

          img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }

    .event-date {
      margin: 0;
      max-width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .remaining {
      font-size: 24px;
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};

      &.isLive {
        color: ${(props) => props.theme.palette.error.main};
      }
    }

    .live {
      background: ${(props) => props.theme.palette.error.main};
      color: ${(props) => props.theme.palette.error.contrastText};
      padding: 0 10px;
      border-radius: 3px;
    }
  }
`;

const MatchPageHeader = ({ match }: IPropsMatchPageHeader) => {
  const targetDate = match ? match.start_time : '';

  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (match === null) {
    return <></>;
  }

  return (
    <StyledMatchPageHeader className="MatchPageHeader">
      <div className="content">
        <div className="event-league">
          <img
            style={{ width: 15 }}
            src={`https://cdn.oddspedia.com/images/categories/${match.tournament.category.slug}.svg`}
            alt=""
          />

          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {match.tournament.name}
          </Typography>
        </div>

        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {timeFormatService.formatDateForEventPage(match.start_time)}
        </Typography>

        <div className="event-container">
          <div className="team home-team">
            <Typography variant="h5" component="span">
              {match.competitors.home.name}
            </Typography>

            <div className="team-image">
              <img
                width="40"
                height="40"
                src={`${match.competitors.home.logo}`}
                alt=""
              />
            </div>
          </div>

          <div className="event-date">
          {/* { isLive: match.matchstatus === 2 } */}
            <Typography
              className={classNames('remaining', { isLive: false })}
              variant="h1"
              component="p"
              noWrap
            >
              {/* {match.hscore !== null ? `${match.hscore} - ${match.ascore}` : `? - ?`} */}
              {`? - ?`}
            </Typography>

            {/* <Typography className="preview" variant="body2" component="p">
              {timeFormatService.formatDateForEventPage(match.starttime || match.md)}
            </Typography> */}

            <Typography className="preview" variant="body2" component="p">
              {!isNaN(days) && days > 0 && `${days}d ${hours}h ${minutes}m`}

              {!isNaN(days) && days === 0 && `${hours}h ${minutes}m ${seconds}s`}
            </Typography>

            {/* {match.matchstatus === 2 && (
              <div className="live">
                <Typography variant="caption" component="p">
                  Live
                </Typography>
              </div>
            )} */}
          </div>

          <div className="team">
            <div className="team-image">
              <img
                width="40"
                height="40"
                src={`${match.competitors.away.logo}`}
                alt=""
              />
            </div>

            <Typography variant="h5" component="span">
              {match.competitors.away.name}
            </Typography>
          </div>
        </div>

        {/* <div className="teams-recent-form">
          {match && match.ht_form && match.at_form && (
            <RecentForm home={match.ht} away={match.at} homeForm={match.ht_form} awayForm={match.at_form} />
          )}
        </div> */}
      </div>
    </StyledMatchPageHeader>
  );
};

export default MatchPageHeader;
