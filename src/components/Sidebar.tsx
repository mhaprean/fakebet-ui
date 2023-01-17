import { ChevronRightOutlined, Inbox as InboxIcon, Public as PublicIcon } from '@mui/icons-material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { IIgubetCategory } from '../redux/features/igubetTypes';
import { IOddspediaLeague } from '../redux/features/oddspediaTypes';
import CategoryList from './sidebar/CategoryList';

const StyledSidebar = styled('div')`
  /* width: 250px; */
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

    ${(props) => props.theme.breakpoints.up('md')} {
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
  leagues: IOddspediaLeague[];
  isIguAdmin?: boolean;
  onDrawerClose?: () => void;
  isTemporary?: boolean;
  categories?: IIgubetCategory[];
}

const Sidebar = ({
  leagues,
  categories = [],
  onDrawerClose = () => {},
  isTemporary = false,
}: IPropsSidebar) => {
  const location = useLocation();

  return (
    <StyledSidebar className="Sidebar">
      {isTemporary && (
        <>
          <Box className="title">
            <Link to={'/'}>
              <Typography variant="h6">Fakebet UI</Typography>
            </Link>
          </Box>
          <Divider />
        </>
      )}

      <div className="sidebar-content">
        {leagues.length > 0 && (
          <>
            <Box className="title">
              <Typography variant="h6">Top Leagues</Typography>
            </Box>

            <List>
              {leagues.map((league, idx) => (
                <Link
                  key={idx}
                  to={`/sports/${league.sport_slug}/${league.category_slug}/${league.league_slug}`}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      className="top-league"
                      selected={
                        location.pathname ===
                        `/sports/${league.sport_slug}/${league.category_slug}/${league.league_slug}`
                      }
                    >
                      <ListItemIcon>
                        <img
                          className="league-image"
                          src={`https://cdn.oddspedia.com/images/leagues/small/${league.sport_slug}/${league.category_slug}/${league.league_slug}.png`}
                          alt=""
                        />
                      </ListItemIcon>

                      <ListItemText
                        title={league.league_name}
                        className="league-name"
                        primary={league.league_name}
                      />
                      {league.match_count_prematch}
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </>
        )}


        {categories.length > 0 && (
          <>
            <Box className="title">
              <Typography variant="h6">All Countries Igu</Typography>
            </Box>

            <CategoryList categories={categories} />
          </>
        )}

        <>
          <Box className="title">
            <Typography variant="h6">Igubet</Typography>
          </Box>
          <List>
            <Link to={'/igubet/sports'}>
              <ListItem disablePadding>
                <ListItemButton selected={location.pathname === '/sports'}>
                  <ListItemIcon>
                    <PublicIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sports" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to={'/igubet/sports/1/categories'}>
              <ListItem disablePadding>
                <ListItemButton selected={location.pathname === '/sports/1/categories'}>
                  <ListItemIcon>
                    <PublicIcon />
                  </ListItemIcon>
                  <ListItemText primary="Igubet Footbal Categories" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
