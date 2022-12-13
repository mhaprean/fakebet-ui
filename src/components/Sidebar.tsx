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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

const StyledSidebar = styled(Paper)`
  width: 250px;

  .logo {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
`;

const Sidebar = () => {

  const location = useLocation();
  return (
    <StyledSidebar className="Sidebar" square>
      <Box className="logo">
        <Typography variant="subtitle2">Fakebet Admin</Typography>
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
        <Link to={'/categories'}>
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
    </StyledSidebar>
  );
};

export default Sidebar;
