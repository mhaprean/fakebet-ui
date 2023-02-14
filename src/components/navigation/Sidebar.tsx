import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { igubetSoccerTopLeagues } from '../../helpers/igubetTopLeagues';
import { useGetBetableTournamentsQuery } from '../../redux/features/igubetApi';
import FakebetLogo from '../atoms/FakebetLogo';
import ImageWithFallback from '../atoms/ImageWithFallback';
import CategoryList from '../sidebar/CategoryList';

const StyledSidebar = styled('div')`
  width: 100%;
  height: 100%;

  .title {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }

  .top-league {
    &.Mui-selected {
      box-shadow: inset 4px 0 0 ${(props) => props.theme.palette.secondary.main};
      background: none;
    }

    &:hover {
      box-shadow: inset 4px 0 0 ${(props) => props.theme.palette.secondary.main};
      background: ${(props) => props.theme.palette.action.hover};
    }
  }

  .league-image {
    width: 20px;
    height: 20px;
  }

  .league-name {
    .MuiTypography-root {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .MuiListItemButton-root {
    padding: 5px 10px;
  }

  .sidebar-content {
    height: calc(100% - 52px);
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    ${(props) => props.theme.breakpoints.up('lg')} {
      height: calc(100% - 2px);
    }

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 20px;
      background-clip: content-box;
      border: none;
    }

    &:hover {
      scrollbar-color: initial;

      &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.palette.grey[400]};
        border-radius: 20px;
        background-clip: content-box;
        border: none;
      }
    }
  }
`;

interface IPropsSidebar {
  isIguAdmin?: boolean;
  onDrawerClose?: () => void;
  isTemporary?: boolean;
}

const Sidebar = ({ onDrawerClose = () => {}, isTemporary = false }: IPropsSidebar) => {
  const location = useLocation();

  const { data: bettableCategories, isFetching } = useGetBetableTournamentsQuery({
    sport_key: 'soccer',
  });

  return (
    <StyledSidebar className="Sidebar">
      {isTemporary && (
        <>
          <Box className="title">
            <Link to={'/'}>
              <FakebetLogo />
            </Link>
          </Box>
          <Divider />
        </>
      )}

      <div className="sidebar-content">
        <>
          <Box className="title">
            <Typography variant="h6">Top Leagues</Typography>
          </Box>

          <List>
            {igubetSoccerTopLeagues.map((tournament, idx) => (
              <Link
                key={idx}
                to={`/offer/${tournament.category.id}/${tournament.category.slug}/${tournament.id}/${tournament.slug}`}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    className="top-league"
                    selected={
                      location.pathname ===
                      `/offer/${tournament.category.id}/${tournament.category.slug}/${tournament.id}/${tournament.slug}`
                    }
                  >
                    <ListItemIcon>
                      <ImageWithFallback image={`${tournament.image}`} type="league" />
                    </ListItemIcon>

                    <ListItemText title={tournament.name} className="league-name" primary={tournament.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </>

        {bettableCategories && (
          <>
            <Box className="title">
              <Typography variant="h6">All Countries</Typography>
            </Box>

            <CategoryList categories={bettableCategories} />
          </>
        )}
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
