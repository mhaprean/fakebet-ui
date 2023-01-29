import { styled } from '@mui/material/styles';
import { Paper, Skeleton } from '@mui/material';

const StyledMatchPageHeaderSkeleton = styled('div')`
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
    margin-top: 10px;

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

  .event-start-time {
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

const MatchPageHeaderSkeleton = () => {
  return (
    <StyledMatchPageHeaderSkeleton className="MatchPageHeaderSkeleton">
      <div className="content">
        <div className="event-league">
          <Skeleton variant="circular" width={20} height={20} style={{ marginRight: 10 }} />

          <Skeleton variant="text" width={80} />
        </div>

        <div className="event-start-time">
          <Skeleton variant="text" width={110} />
        </div>

        <div className="event-container">
          <div className="team home-team">
            <Skeleton variant="text" width={80} />

            <div className="team-image">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>

          <div className="event-date">
            {/* { isLive: match.matchstatus === 2 } */}

            <Skeleton className="remaining" variant="text" width={80} />

            <Skeleton className="preview" variant="text" width={110} />
          </div>

          <div className="team">
            <div className="team-image">
              <Skeleton variant="circular" width={40} height={40} />
            </div>

            <Skeleton variant="text" width={80} />
          </div>
        </div>
      </div>
    </StyledMatchPageHeaderSkeleton>
  );
};

export default MatchPageHeaderSkeleton;
