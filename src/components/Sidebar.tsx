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
import { IOddspediaLeague } from '../redux/features/oddspediaTypes';

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
`;

interface IPropsSidebar {
  leagues: IOddspediaLeague[];
}

const Sidebar = ({ leagues }: IPropsSidebar) => {
  const location = useLocation();

  return (
    <StyledSidebar className="Sidebar">
      <Box className="title">
        <Typography variant="h6">Fakebet Admin</Typography>
      </Box>

      <Box className="title">
        <Typography variant="h6">Top Leagues</Typography>
      </Box>

      <List>
        {leagues.map((league, idx) => (
          <Link key={idx} to={`/sports/${league.sport_slug}/${league.category_slug}/${league.league_slug}`}>
            <ListItem disablePadding>
              <ListItemButton selected={location.pathname === '/'}>
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
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Box className="title">
        <Typography variant="h6">Oddspedia</Typography>
      </Box>

      <List>
        <Link to={'/'}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/oddspedia-categories'}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/categories'}>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/games'}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/games'}>
              <ListItemIcon>
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText primary="Games" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box className="title">
        <Typography variant="h6">Igubet</Typography>
      </Box>
      <List>
        <Link to={'/sports'}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === '/sports'}>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Sports" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/sports/1/categories'}>
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
    </StyledSidebar>
  );
};

export default Sidebar;
