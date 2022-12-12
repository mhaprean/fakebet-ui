import { ChevronRightOutlined, Inbox as InboxIcon } from '@mui/icons-material';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledSidebar = styled(Paper)`
  width: 280px;
`;

const Sidebar = () => {
  return (
    <StyledSidebar className="Sidebar" variant="outlined" square>
      <Box>
        <Typography>Fake bet</Typography>
      </Box>

      <List>
        <Link to={'/'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={'/games'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText primary="Games" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </StyledSidebar>
  );
};

export default Sidebar;
