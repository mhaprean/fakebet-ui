import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MainSearch from './search/MainSearch';

const StyledSearchDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background: ${(props) => props.theme.palette.background.paper};
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
`;

const StyledNavigation = styled(AppBar)`
  /* box-shadow: none; */
  background: ${(props) => props.theme.palette.background.paper};

  background: ${props => props.theme.navigation.main};
  color: ${props => props.theme.navigation.text};

  .MuiSvgIcon-root {
    color: ${props => props.theme.navigation.text};
  }

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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <StyledNavigation className="Navigation" position="fixed" variant="outlined" elevation={0}>
      <Toolbar className="toolbar">
        <Box className="left-group">
          <IconButton
            sx={{ display: { xs: 'flex', lg: 'none' }, marginRight: '15px' }}
            onClick={() => onMenuToggle()}
          >
            <MenuIcon sx={{ fontSize: '20px' }} />
          </IconButton>

          <Box className="logo" sx={{ width: { lg: '250px' } }}>
            <Link to="/">
              <Typography variant="h6" sx={{ marginRight: '20px' }} noWrap>
                Fakebet UI
              </Typography>
            </Link>
          </Box>

        </Box>
        <Box className="right-group">
          <IconButton onClick={() => setSearchOpen(true)}>
            <SearchIcon sx={{ fontSize: '20px' }} />
          </IconButton>

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

      <StyledSearchDrawer anchor={'top'} open={searchOpen} onClose={() => setSearchOpen(false)}>
        <MainSearch onClose={() => setSearchOpen(false)} />
      </StyledSearchDrawer>
    </StyledNavigation>
  );
};

export default Navigation;
