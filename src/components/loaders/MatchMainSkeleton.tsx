import { Divider, Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';

export interface IPropsMatchMainSkeleton {
  homeWidth: number;
  awayWidth: number;
  totalBets: number;
}

const StyledMatchMainSkeleton = styled(Paper)`
  padding: 10px;

  .matchHeader {
    display: flex;
    align-items: center;
    padding-top: 5px;

    .MuiSkeleton-rectangular {
      border-radius: 50px;
    }
  }
  .matchTeams {
    margin: 5px 0;
    display: flex;
    align-items: center;

    .Team {
      border-radius: 50px;
      flex-shrink: 0;
      z-index: 0;

      .MuiSkeleton-root {
        z-index: 1;
      }

      &.awayTeam {
        margin-left: -10px;
        z-index: 0;
        margin-right: 5px;
        flex-shrink: 0;
      }
    }
  }
  .matchLeague {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .League {
      display: flex;
      align-items: center;
    }
  }

  .MatchDivider {
    margin: 10px 0;
  }
  .TicketCount {
    margin-bottom: 10px;
    .MuiSkeleton-root {
      height: 25px;
    }
  }
  .Bet {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .MuiSkeleton-root {
      height: 20px;
    }
  }
  .dots {
    margin: 10px 0;
    margin-top: 20px;
  }
  .SeeMore {
    .MuiSkeleton-root {
      border-radius: 4px;
    }
  }
`;

const MatchMainSkeleton = ({ homeWidth, awayWidth, totalBets }: IPropsMatchMainSkeleton) => {
  const fourBets = [
    <div className="Bet" key={1}>
      <Skeleton width={100} variant="text" />
      <Skeleton variant="text" width={65} style={{ marginLeft: 'auto' }} />
    </div>,

    <div className="Bet" key={2}>
      <Skeleton width={120} variant="text" />
      <Skeleton variant="text" width={65} style={{ marginLeft: 'auto' }} />
    </div>,

    <div className="Bet" key={3}>
      <Skeleton width={90} variant="text" />
      <Skeleton variant="text" width={65} style={{ marginLeft: 'auto' }} />
    </div>,

    <div className="Bet" key={4}>
      <Skeleton width={70} variant="text" />
      <Skeleton variant="text" width={65} style={{ marginLeft: 'auto' }} />
    </div>,
  ];

  return (
    <StyledMatchMainSkeleton className={classNames('MatchMainSkeleton')} variant="outlined">
      <div className="matchHeader">
        <Skeleton variant="rectangular" width={85} height={24} style={{ marginRight: 5 }} />
        <Skeleton variant="rectangular" width={70} height={24} />
        <Skeleton variant="circular" width={24} height={24} style={{ marginRight: 5, marginLeft: 'auto' }} />
      </div>

      <div className="matchTeams">
        <div className="Team homeTeam">
          <Skeleton variant="circular" width={45} height={45} />
        </div>
        <div className="Team awayTeam">
          <Skeleton variant="circular" width={45} height={45} />
        </div>

        <div className="teamNames">
          <Skeleton variant="text" width={homeWidth} />
          <Skeleton variant="text" width={awayWidth} />
        </div>
      </div>

      <div className="matchLeague">
        <div className="League">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width={70} style={{ marginLeft: 5 }} />
        </div>
        <div className="League">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width={70} style={{ marginLeft: 5 }} />
        </div>
      </div>

      <Divider className="MatchDivider" />

      <div className="TicketCount">
        <Skeleton variant="text" width={70} />
      </div>

      {fourBets.slice(0, totalBets).map((bet, idx) => bet)}

      {totalBets > 3 && (
        <div className="dots">
          <Skeleton width={20} variant="text" />
        </div>
      )}
    </StyledMatchMainSkeleton>
  );
};

export default MatchMainSkeleton;
