import { AppBar, Avatar, Box, Drawer, IconButton, Tab, Tabs, Toolbar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainSearch from '../search/MainSearch';
import LoginRegister from '../auth/LoginRegister';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetMyProfileQuery } from '../../redux/features/strapiApi';
import { logout, setUser } from '../../redux/features/authSlice';
import { setAppTheme } from '../../redux/features/settingsSlice';
import AccountSidebar from './AccountSidebar';
import FakebetLogo from '../atoms/FakebetLogo';

const StyledSearchDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background: ${(props) => props.theme.palette.background.paper};
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
`;

const StyledNavigation = styled(AppBar)`
  background: ${(props) => props.theme.navigation.main};
  color: ${(props) => props.theme.navigation.text};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};

  .MuiSvgIcon-root {
    color: ${(props) => props.theme.navigation.text};
  }

  .toolbar {
    padding: 0 10px;
  }
  .left-group,
  .right-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-group {
    margin-left: auto;
  }

  .tabs {
    height: ${(props) => props.theme.mixins.toolbar.minHeight}px;
    .MuiTab-root {
      color: ${(props) => props.theme.navigation.text};
    }
    .MuiTabs-indicator {
      background-color: ${(props) => props.theme.palette.secondary.main};
      height: 3px;
      bottom: 0;
    }
  }
`;

interface IMenuEntry {
  name: string;
  path: string;
}

const menuEntries: IMenuEntry[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Offer',
    path: '/offer',
  },
  {
    name: 'Latest Tips',
    path: '/tips',
  },
  {
    name: 'Players',
    path: '/players',
  },
  {
    name: 'Tickets',
    path: '/tickets',
  },
];

const acceptedPaths = ['/', '/offer', '/tips', '/players', '/tickets'];

interface IPropsNavigation {
  onMenuToggle?: () => void;
}

const extractPageName = (str: string) => {
  return '/' + str.split('/')[1];
};

const Navigation = ({ onMenuToggle = () => {} }: IPropsNavigation) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const authState = useAppSelector((rootState) => rootState.auth);
  const themeName = useAppSelector((rootState) => rootState.settings.themeName);

  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const activeTab = extractPageName(acceptedPaths.includes(location.pathname) ? location.pathname : '/');

  const {
    data: myProfile,
    isLoading,
    isSuccess,
    isError,
  } = useGetMyProfileQuery({}, { skip: !authState.isAuth });

  const dispatch = useAppDispatch();

  const a11yProps = (index: string | number) => {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  };

  const toggleTheme = () => {
    if (themeName === 'dark') {
      dispatch(setAppTheme('light'));
    } else {
      dispatch(setAppTheme('dark'));
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (myProfile) {
      dispatch(setUser({ user: myProfile }));
    }
  }, [myProfile, dispatch]);

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
              <FakebetLogo />
            </Link>
          </Box>
        </Box>

        {!isMobile && (
          <>
            <Tabs className="tabs" value={activeTab}>
              {menuEntries.map((item, idx) => (
                <Tab
                  key={idx}
                  label={item.name}
                  value={item.path}
                  component={Link}
                  to={item.path}
                  {...a11yProps(idx)}
                />
              ))}
            </Tabs>
          </>
        )}

        <Box className="right-group">
          <IconButton onClick={() => setSearchOpen(true)}>
            <SearchIcon sx={{ fontSize: '20px' }} />
          </IconButton>

          <IconButton onClick={toggleTheme}>
            {themeName !== 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '20px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '20px' }} />
            )}
          </IconButton>

          {/* This is the modal that handles login/register */}
          {!authState.isAuth && !isMobile && <LoginRegister />}

          <IconButton size="small" onClick={() => setAccountOpen(!accountOpen)}>
            {authState.isAuth ? (
              <Avatar sx={{ width: 32, height: 32 }} src={authState.user?.image}>
                A
              </Avatar>
            ) : (
              <MoreVertIcon sx={{ fontSize: '20px' }} />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor={'right'}
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundImage: 'none' },
        }}
      >
        <AccountSidebar onClose={() => setAccountOpen(false)} />
      </Drawer>

      <StyledSearchDrawer anchor={'top'} open={searchOpen} onClose={() => setSearchOpen(false)}>
        <MainSearch onClose={() => setSearchOpen(false)} />
      </StyledSearchDrawer>
    </StyledNavigation>
  );
};

export default Navigation;
