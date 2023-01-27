import { styled } from '@mui/material/styles';
import { Paper, Skeleton } from '@mui/material';

const StyledMarketsSkeleton = styled('div')`
  .chips {
    display: flex;
    gap: 10px;
    overflow: auto;
    padding: 10px 0;

    .chip-skeleton {
      border-radius: 30px;
    }
  }

  .market-name {
    padding: 5px 10px;
    margin-bottom: 5px;
  }

  .market-outcomes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 0;
    margin-bottom: 20px;

    .outcome {
      display: flex;
      justify-content: space-between;
      flex-basis: 30%;
      flex-grow: 1;
      min-width: 70px;
      background: ${(props) => props.theme.palette.background.paper};
      border-radius: 5px;
      text-transform: unset;
      border: 1px solid ${(props) => props.theme.palette.divider};
      padding: 6px 8px;
    }
  }
`;

const MarketsSkeleton = () => {
  return (
    <StyledMarketsSkeleton className="MarketsSkeleton">
      <div className="chips">
        <Skeleton className="chip-skeleton" variant="rectangular" width={42} height={32} />
        <Skeleton className="chip-skeleton" variant="rectangular" width={37} height={32} />
        <Skeleton className="chip-skeleton" variant="rectangular" width={46} height={32} />
        <Skeleton className="chip-skeleton" variant="rectangular" width={50} height={32} />
        <Skeleton className="chip-skeleton" variant="rectangular" width={56} height={32} />
      </div>
      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={42} height={24} />
        </Paper>

        <div className="market-outcomes">
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
        </div>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={92} height={24} />
        </Paper>

        <div className="market-outcomes">
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
        </div>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={72} height={24} />
        </Paper>

        <div className="market-outcomes">
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
        </div>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={82} height={24} />
        </Paper>

        <div className="market-outcomes">
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
        </div>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={42} height={24} />
        </Paper>

        <div className="market-outcomes">
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
          <Paper className="outcome" variant="outlined">
            <Skeleton variant="text" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Paper>
        </div>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={82} height={24} />
        </Paper>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={82} height={24} />
        </Paper>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={82} height={24} />
        </Paper>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={82} height={24} />
        </Paper>
      </div>

      <div className="market">
        <Paper className="market-name" variant="outlined">
          <Skeleton variant="text" width={82} height={24} />
        </Paper>
      </div>
    </StyledMarketsSkeleton>
  );
};

export default MarketsSkeleton;
