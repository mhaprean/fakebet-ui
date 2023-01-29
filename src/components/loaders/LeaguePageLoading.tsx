import { Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MatchListLoading from './MatchListLoading';

const StyledLeaguePageLoading = styled('div')`
  margin-bottom: 10px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  .dayHeader {
    background: ${(props) => props.theme.navigation.light};
    padding: 0 5px;
    display: flex;
    align-items: center;
    margin-top: 25px;
    height: 36px;
  }

  .league {
    display: flex;
    flex-direction: column;
  }

  .upcoming-skeleton {
    margin-top: 20px;
  }
`;

const LeaguePageLoading = () => {
  return (
    <StyledLeaguePageLoading className="LeaguePageLoading">

      <Skeleton className='upcoming-skeleton' variant="text" width={50} />

      <Paper className="dayHeader" variant="outlined">
        <Skeleton variant="text" width={50} />
      </Paper>
      <MatchListLoading matchNr={2} />

      <Paper className="dayHeader" variant="outlined">
        <Skeleton variant="text" width={90} />
      </Paper>
      <MatchListLoading matchNr={4} />
    </StyledLeaguePageLoading>
  );
};

export default LeaguePageLoading;
