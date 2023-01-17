import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IIgutbetTournament } from '../../redux/features/igubetTypes';

interface IPropsLeagueHeader {
  tournament: IIgutbetTournament;
}

const StyledLeagueHeader = styled(Paper)`
  align-items: center;
  display: flex;
  padding: 5px 10px;
  margin-top: 30px;
  box-shadow: none;
  border: 1px solid ${props => props.theme.palette.divider};

  .league {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
`;

const LeagueHeader = ({ tournament }: IPropsLeagueHeader) => {
  return (
    <StyledLeagueHeader className="LeagueHeader" variant="elevation" elevation={3}>
      <img
        style={{ width: 15 }}
        src={`https://cdn.oddspedia.com/images/categories/${tournament.category.slug}.svg`}
        alt=""
      />
      <div className="league">
        <Typography className="league-name" noWrap variant="body2" component={'span'}>
          {tournament.name}
        </Typography>
        <Typography className="league-country" noWrap variant="caption" component={'span'}>
          {tournament.category.name}
        </Typography>
      </div>
    </StyledLeagueHeader>
  );
};

export default LeagueHeader;
