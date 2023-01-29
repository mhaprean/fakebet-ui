import { Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MatchListLoading from './MatchListLoading';

const StyledSportPageLoading = styled('div')`
  margin-bottom: 10px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  .skeletonTitle {
    background: ${(props) => props.theme.navigation.light};
    padding: 0 5px;
    display: flex;
    border: none;
    align-items: center;
    margin-top: 30px;
  }

  .league {
    display: flex;
    flex-direction: column;
  }
`;

const SportPageLoading = () => {
  return (
    <StyledSportPageLoading className="SportPageLoading">
      <Paper className="skeletonTitle" variant="outlined">
        <Skeleton variant="circular" width={20} height={20} style={{ margin: 5 }} />

        <div className="league">
          <Skeleton variant="text" width={50} style={{ marginRight: 10 }} />
          <Skeleton variant="text" width={80} />
        </div>

        <Skeleton variant="circular" width={20} height={20} style={{ margin: 8, marginLeft: 'auto' }} />
      </Paper>
      <MatchListLoading matchNr={2} />

      <Paper className="skeletonTitle" variant="outlined">
        <Skeleton variant="circular" width={20} height={20} style={{ margin: 5 }} />

        <div className="league">
          <Skeleton variant="text" width={30} style={{ marginRight: 10 }} />
          <Skeleton variant="text" width={120} />
        </div>

        <Skeleton variant="circular" width={20} height={20} style={{ margin: 8, marginLeft: 'auto' }} />
      </Paper>
      <MatchListLoading matchNr={4} />
    </StyledSportPageLoading>
  );
};

export default SportPageLoading;
