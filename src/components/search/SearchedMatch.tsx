import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import classNames from 'classnames';
import { IIgubetMatch } from '../../redux/features/igubetTypes';
import { timeFormatService } from '../../services/timeFormaterService';
import parse from 'html-react-parser';
import SportIcon from '../SportIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IPropsSearchedMatch {
  match: IIgubetMatch;
}

const StyledSearchedMatch = styled(Paper)`
  display: flex;
  flex-direction: row;
  padding: 5px;
  align-items: stretch;
  box-shadow: none;
  border: 1px solid ${(props) => props.theme.palette.divider};
  margin-top: 10px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    align-items: stretch;
  }

  .time {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0 5px;
    width: 40px;
    flex-shrink: 0;
  }

  .teams {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-content: center;
    /* justify-content: space-evenly; */
    padding: 3px;
    margin-right: auto;
  }

  .team {
    display: flex;
    margin: 2px 0;
    flex-shrink: 0;

    .team-name {
      color: ${(props) => alpha(props.theme.palette.text.primary, 0.9)};
      display: flex;
      align-items: center;

      em {
        color: ${(props) => alpha(props.theme.palette.primary.light, 0.9)};
        font-weight: ${(props) => props.theme.typography.fontWeightMedium};
      }
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      flex-shrink: 0;
    }
  }

  .league-name {
    display: flex;
    color: ${(props) => props.theme.palette.text.secondary};

    .category-name {
      margin-right: 10px;
    }
  }

  .match-sport {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.text.secondary};
  }

  .match-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .match-button {
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const SearchedMatch = ({ match }: IPropsSearchedMatch) => {
  return (
    <StyledSearchedMatch className="SearchedMatch" variant="elevation" elevation={1}>
      <div className="time">
        <Typography variant="caption">
          {timeFormatService.formatDateForMatchSearch(match.start_time)}
        </Typography>
      </div>
      <div className="teams">
        <div className="team">
          <img src={`${match.competitors.home.logo}`} alt="" />
          <Typography noWrap variant="body2" className={classNames('team-name')}>
            {parse(match.competitors.home.name)}
          </Typography>
        </div>
        <div className="team">
          <img src={`${match.competitors.away.logo}`} alt="" />
          <Typography noWrap variant="body2" className={classNames('team-name')}>
            {parse(match.competitors.away.name)}
          </Typography>
        </div>

        <div className="league-name">
          <Typography noWrap variant="body2" className="category-name">
            {match.tournament.category.name}
          </Typography>
          <Typography noWrap variant="body2">
            {match.tournament.name}
          </Typography>
        </div>
      </div>

      <div className="match-info">
        <Box className="match-sport" sx={{marginLeft: 'auto'}}>
          <Typography noWrap variant="body2" sx={{ marginLeft: '5px', marginRight: '5px' }}>
            {match.tournament.sport.name}
          </Typography>
          <SportIcon sportSlug={match.tournament.sport.key || ''} />
        </Box>
        <Box sx={{display: 'flex'}}>
          <Button className='match-button' sx={{marginLeft: 'auto'}} endIcon={<ArrowForwardIcon />}>
            See more 
          </Button>
        </Box>
      </div>
    </StyledSearchedMatch>
  );
};

export default SearchedMatch;
