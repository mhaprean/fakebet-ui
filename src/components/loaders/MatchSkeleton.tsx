import { Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface IPropsMatchSkeleton {
  homeWidth: number;
  awayWidth: number;
}

const StyledMatchSkeleton = styled(Paper)`
  padding: 5px;

  .matchHeader {
    display: flex;
    align-items: center;
  }

  .matchBody {
    display: flex;
    align-items: center;
    margin-top: 15px;

    .time {
      margin: 10px;
    }

    .team {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2px;
    }
  }

  .MatchDivider {
    margin: 5px 0;
  }
  .skeletonOdds {
    display: flex;

    .skeletonOdd {
      flex-grow: 1;
      margin: 0 5px;
      height: 40px;
    }
  }
`;

const MatchSkeleton = ({ homeWidth, awayWidth }: IPropsMatchSkeleton) => {
  return (
    <StyledMatchSkeleton className="MatchSkeleton" variant="outlined">
      <div className="matchHeader">
        <Skeleton variant="circular" width={15} height={15} style={{ marginRight: 10 }} />
        <Skeleton variant="text" width={50} />
      </div>

      <div className="matchBody">
        <div className="time">
          <Skeleton variant="text" width={20} />
        </div>
        <div className="teams">
          <div className="team">
            <Skeleton variant="circular" width={20} height={20} style={{ marginRight: 10 }} />
            <Skeleton variant="text" width={homeWidth} />
          </div>
          <div className="team">
            <Skeleton variant="circular" width={20} height={20} style={{ marginRight: 10 }} />
            <Skeleton variant="text" width={awayWidth} />
          </div>
        </div>

        <Skeleton variant="text" width={50} style={{ marginRight: 10, marginLeft: 'auto' }} />
      </div>

      <div className="skeletonOdds">
        <Skeleton className="skeletonOdd" variant="text" />
        <Skeleton className="skeletonOdd" variant="text" />
        <Skeleton className="skeletonOdd" variant="text" />
      </div>
    </StyledMatchSkeleton>
  );
};

export default MatchSkeleton;
