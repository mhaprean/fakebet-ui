import { IconButton, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IIgutbetTournament } from '../../redux/features/igubetTypes';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../atoms/ImageWithFallback';

interface IPropsLeagueHeader {
  tournament: IIgutbetTournament;
}

const StyledLeagueHeader = styled(Paper)`
  align-items: center;
  display: flex;
  padding: 0px 10px;
  margin-top: 30px;
  box-shadow: none;
  border: 1px solid ${(props) => props.theme.palette.divider};

  background: ${(props) => props.theme.navigation.light};

  .league {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    overflow: hidden;

    a {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .MuiTypography-root {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .league-name {
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  }

  .league-country {
    color: ${(props) => props.theme.palette.text.secondary};
    font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  }

  .league-link {
    margin-left: auto;
  }

  img {
    width: 15px;
    height: 15px;
  }
`;

const LeagueHeader = ({ tournament }: IPropsLeagueHeader) => {
  return (
    <StyledLeagueHeader className="LeagueHeader" variant="outlined">
      <ImageWithFallback
        image={`https://cdn.oddspedia.com/images/categories/${tournament.category.slug}.svg`}
        type="category"
      />

      <div className="league">
        <Link
          to={`/sports/${tournament.sport.key}/${tournament.category.id}/${tournament.category.slug}/${tournament.id}/${tournament.slug}`}
        >
          <Typography className="league-name" noWrap variant="body2" component={'span'}>
            {tournament.name}
          </Typography>
        </Link>
        <Link to={`/sports/${tournament.sport.key}/${tournament.category.id}/${tournament.category.slug}`}>
          <Typography className="league-country" noWrap variant="caption" component={'span'}>
            {tournament.category.name}
          </Typography>
        </Link>
      </div>
      <Link
        className="league-link"
        to={`/sports/${tournament.sport.key}/${tournament.category.id}/${tournament.category.slug}/${tournament.id}/${tournament.slug}`}
      >
        <IconButton>
          <ArrowForward />
        </IconButton>
      </Link>
    </StyledLeagueHeader>
  );
};

export default LeagueHeader;
