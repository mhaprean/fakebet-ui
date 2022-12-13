import { AppBar, Box, Divider, IconButton, InputBase, Paper, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
} from '@mui/icons-material';

const StyledNavigation = styled(AppBar)`
  position: static;
  background: none;
  box-shadow: none;

  .toolbar {
    justify-content: space-between;
  }
  .left-group,
  .right-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-field {
    border-radius: 20px;
    padding: 2px;
    padding-left: 20px;
    display: flex;
    margin-left: 20px;
    box-shadow: none;
    border: 1px solid ${props => props.theme.palette.divider};
  }
`;

interface IPropsNavigation {
  isDarkMode?: boolean;
  onThemeChange?: () => void;
}

const Navigation = ({ isDarkMode = false, onThemeChange = () => {} }: IPropsNavigation) => {
  return (
    <StyledNavigation>
      <Toolbar className="toolbar">
        <Box className="left-group">
          <IconButton>
            <MenuIcon sx={{ fontSize: '20px' }} />
          </IconButton>
          <Paper className="search-field" variant='elevation' elevation={1}>
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Paper>
        </Box>
        <Box className="right-group">
          <IconButton onClick={onThemeChange}>
            {isDarkMode ? (
              <DarkModeOutlined sx={{ fontSize: '20px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '20px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '20px' }} />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </StyledNavigation>
  );
};

export default Navigation;
