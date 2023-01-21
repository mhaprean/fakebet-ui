import {
  AppBar,
  Box,
  Button,
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
import { useEffect, useState } from 'react';
import MainSearch from '../search/MainSearch';
import LoginRegister from '../auth/LoginRegister';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetMyProfileQuery } from '../../redux/features/strapiApi';
import AccountMenu from './AccountMenu';
import { setUser } from '../../redux/features/authSlice';

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

  background: ${(props) => props.theme.navigation.main};
  color: ${(props) => props.theme.navigation.text};

  .MuiSvgIcon-root {
    color: ${(props) => props.theme.navigation.text};
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

  const authState = useAppSelector((rootState) => rootState.auth);

  const { data: myProfile, isLoading, isSuccess } = useGetMyProfileQuery({}, { skip: !authState.isAuth });

  const dispatch = useAppDispatch();


  useEffect(() => {

    if (myProfile) {
      dispatch(setUser({user: myProfile}));
    }

  }, [isSuccess]);

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
          {/* This is the modal that handles login/register */}
          {!authState.isAuth && <LoginRegister />}

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

          {authState.isAuth && <AccountMenu />}
        </Box>
      </Toolbar>

      <StyledSearchDrawer anchor={'top'} open={searchOpen} onClose={() => setSearchOpen(false)}>
        <MainSearch onClose={() => setSearchOpen(false)} />
      </StyledSearchDrawer>
    </StyledNavigation>
  );
};

export default Navigation;
