import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { igubetSports } from '../../helpers/igubetSports';
import SportIcon from '../sport/SportIcon';

const StyledSportNavigation = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: auto;
  padding: 10px 0;

  scrollbar-width: thin;

  flex-wrap: nowrap;

  ${(props) => props.theme.breakpoints.up('md')} {
    flex-wrap: wrap;
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.grey[400]};
    border-radius: 20px;
    background-clip: content-box;
    border: none;
  }

  .MuiSvgIcon-root {
    margin-left: 5px;
  }

  .sport {
    cursor: pointer;

    &.active {
      background: ${(props) => props.theme.palette.primary.main};
      color: ${(props) => props.theme.palette.primary.contrastText};
    }
  }
`;
const SportNavigation = () => {
  const location = useLocation();

  return (
    <StyledSportNavigation className="SportNavigation">
      {igubetSports.map((sport, idx) => (
        <Link to={`/sports/${sport.key}`} key={idx}>
          <Chip
            className={classNames('sport', { active: `/sports/${sport.key}` === location.pathname })}
            label={sport.name}
            icon={<SportIcon sportSlug={sport.key} />}
          />
        </Link>
      ))}
    </StyledSportNavigation>
  );
};

export default SportNavigation;
