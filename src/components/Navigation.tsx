import { AppBar, Box, Divider, IconButton, InputBase, Paper, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledNavigation = styled(AppBar)`
  /* box-shadow: none; */
  background: ${(props) => props.theme.palette.background.paper};

  .toolbar {
    justify-content: space-between;
    padding: 0 10px;
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
    <StyledNavigation className="Navigation" position="fixed" variant="outlined" elevation={0}>
      <Toolbar className="toolbar">
        <Box className="left-group">
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, marginRight: '15px' }}
            onClick={() => onMenuToggle()}
          >
            <MenuIcon sx={{ fontSize: '20px' }} />
          </IconButton>

          <Box className="logo" sx={{ width: { md: '250px' } }}>
            <Link to="/">
              <Typography variant="h6" sx={{ marginRight: '20px' }} noWrap>
                Fakebet Admin
              </Typography>
            </Link>
          </Box>

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
