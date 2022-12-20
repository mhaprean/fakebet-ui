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
  
  /* box-shadow: none; */
  background: ${props => props.theme.palette.background.paper};

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
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

interface IPropsNavigation {
  isDarkMode?: boolean;
  onThemeChange?: () => void;
  onMenuToggle?: () => void;
}

const Navigation = ({
  isDarkMode = false,
  onThemeChange = () => {},
  onMenuToggle = () => {},
}: IPropsNavigation) => {
  return (
    <StyledNavigation
      className="Navigation"
      position="fixed"
      variant='outlined'
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${250}px)` },
        ml: { sm: `${250}px` },
      }}
    >
      <Toolbar className="toolbar">
        <Box className="left-group">
          <IconButton sx={{ display: { xs: 'flex', sm: 'none' }, marginRight: '15px' }} onClick={() => onMenuToggle()}>
            <MenuIcon sx={{ fontSize: '20px' }} />
          </IconButton>
          <Paper className="search-field" variant="elevation" elevation={1}>
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
    </StyledNavigation>
  );
};

export default Navigation;
