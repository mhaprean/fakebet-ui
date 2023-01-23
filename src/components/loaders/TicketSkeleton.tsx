import { Divider, Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';

export interface IPropsTicketSkeleton {
  homeWidth: number;
  awayWidth: number;
  totalBets: number;
  isSlide?: boolean;
}

const StyledTicketSkeleton = styled(Paper)`
  .TicketInfo {
    padding: 5px;
  }
  .Chips {
    display: flex;
    .MuiSkeleton-rectangular {
      border-radius: 50px;
    }
  }
  .Infos {
    margin-top: 10px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }

  .Bet {
    margin-top: -1px;
    border-left: none;
    border-right: none;
    padding: 0 5px;
    .Header {
      display: flex;
      align-items: center;
    }
  }

  .Body {
    display: flex;
  }

  &.isSlide {
    .Bets {
      max-height: 200px;
      overflow: auto;
    }
  }
`;

const TicketSkeleton = ({ homeWidth, awayWidth, totalBets, isSlide = false }: IPropsTicketSkeleton) => {
  const fourBets = [
    <Paper className="Bet" key={1} variant="outlined" square>
      <div className="Header">
        <Skeleton variant="circular" width={15} height={15} style={{ marginRight: 5 }} />
        <Skeleton width={80} variant="text" />
        <Skeleton width={60} variant="text" style={{ marginLeft: 'auto' }} />
      </div>
      <div className="Body">
        <div className="Info" style={{ marginRight: 5 }}>
          <Skeleton variant="text" width={35} />
          <Skeleton variant="text" width={35} />
        </div>
        <div className="Info">
          <Skeleton variant="text" width={homeWidth} />
          <Skeleton variant="text" width={awayWidth} />
        </div>
        <div className="Info" style={{ marginLeft: 'auto' }}>
          <Skeleton variant="text" width={45} />
        </div>
      </div>
      <Skeleton variant="text" width={65} />
    </Paper>,

    <Paper className="Bet" key={2} variant="outlined" square>
      <div className="Header">
        <Skeleton variant="circular" width={15} height={15} style={{ marginRight: 5 }} />
        <Skeleton width={80} variant="text" />
        <Skeleton width={60} variant="text" style={{ marginLeft: 'auto' }} />
      </div>
      <div className="Body">
        <div className="Info" style={{ marginRight: 5 }}>
          <Skeleton variant="text" width={35} />
          <Skeleton variant="text" width={35} />
        </div>
        <div className="Info">
          <Skeleton variant="text" width={homeWidth} />
          <Skeleton variant="text" width={awayWidth} />
        </div>
        <div className="Info" style={{ marginLeft: 'auto' }}>
          <Skeleton variant="text" width={45} />
        </div>
      </div>
      <Skeleton variant="text" width={65} />
    </Paper>,

    <Paper className="Bet" key={3} variant="outlined" square>
      <div className="Header">
        <Skeleton variant="circular" width={15} height={15} style={{ marginRight: 5 }} />
        <Skeleton width={80} variant="text" />
        <Skeleton width={60} variant="text" style={{ marginLeft: 'auto' }} />
      </div>
      <div className="Body">
        <div className="Info" style={{ marginRight: 5 }}>
          <Skeleton variant="text" width={35} />
          <Skeleton variant="text" width={35} />
        </div>
        <div className="Info">
          <Skeleton variant="text" width={homeWidth} />
          <Skeleton variant="text" width={awayWidth} />
        </div>
        <div className="Info" style={{ marginLeft: 'auto' }}>
          <Skeleton variant="text" width={45} />
        </div>
      </div>
      <Skeleton variant="text" width={65} />
    </Paper>,

    <Paper className="Bet" key={4} variant="outlined" square>
      <div className="Header">
        <Skeleton variant="circular" width={15} height={15} style={{ marginRight: 5 }} />
        <Skeleton width={80} variant="text" />
        <Skeleton width={60} variant="text" style={{ marginLeft: 'auto' }} />
      </div>
      <div className="Body">
        <div className="Info" style={{ marginRight: 5 }}>
          <Skeleton variant="text" width={35} />
          <Skeleton variant="text" width={35} />
        </div>
        <div className="Info">
          <Skeleton variant="text" width={homeWidth} />
          <Skeleton variant="text" width={awayWidth} />
        </div>
        <div className="Info" style={{ marginLeft: 'auto' }}>
          <Skeleton variant="text" width={45} />
        </div>
      </div>
      <Skeleton variant="text" width={65} />
    </Paper>,
  ];

  return (
    <StyledTicketSkeleton className={classNames('TicketSkeleton', { isSlide })} variant="outlined" square>
      <div className="TicketInfo">
        <div className="Chips">
          <Skeleton variant="rectangular" width={85} height={20} style={{ marginRight: 5 }} />
          <Skeleton variant="rectangular" width={70} height={20} />
          <Skeleton variant="rectangular" width={60} height={20} style={{ marginLeft: 'auto' }} />
        </div>
        <div className="Infos">
          <div className="Info">
            <Skeleton width={50} variant="text" />
            <Skeleton width={40} variant="text" />
          </div>
          <div className="Info">
            <Skeleton width={40} variant="text" />
            <Skeleton width={35} variant="text" />
          </div>
          <div className="Info">
            <Skeleton width={50} variant="text" />
            <Skeleton width={40} variant="text" style={{ marginLeft: 'auto' }} />
          </div>
        </div>
      </div>

      <Divider className="MatchDivider" />
      <div className="Bets">{fourBets.slice(0, totalBets).map((bet, idx) => bet)}</div>
    </StyledTicketSkeleton>
  );
};

export default TicketSkeleton;
