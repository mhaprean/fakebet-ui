import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainSearch from '../search/MainSearch';
import LoginRegister from '../auth/LoginRegister';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetMyProfileQuery } from '../../redux/features/strapiApi';
import AccountMenu from './AccountMenu';
import { logout, setUser } from '../../redux/features/authSlice';
import { setAppTheme } from '../../redux/features/settingsSlice';

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
    name: 'Sports',
    path: '/sports',
  },
  // {
  //   name: 'Statistics',
  //   path: '/statistics',
  // },
  // {
  //   name: 'Players',
  //   path: '/players',
  // },
  {
    name: 'Tickets',
    path: '/tickets',
  },
];

interface IPropsNavigation {
  onMenuToggle?: () => void;
}

const Navigation = ({ onMenuToggle = () => {} }: IPropsNavigation) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('/');

  const authState = useAppSelector((rootState) => rootState.auth);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const themeName = useAppSelector((rootState) => rootState.settings.themeName);

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

  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setActiveTab(newValue);
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
              <Typography variant="h6" sx={{ marginRight: '20px' }} noWrap>
                Fakebet UI
              </Typography>
            </Link>
          </Box>
        </Box>

        {!isMobile && (
          <>
            <Tabs className="tabs" value={activeTab} onChange={handleTabChange}>
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
          {/* This is the modal that handles login/register */}
          {!authState.isAuth && <LoginRegister />}

          <IconButton onClick={() => setSearchOpen(true)}>
            <SearchIcon sx={{ fontSize: '20px' }} />
          </IconButton>

          <IconButton onClick={toggleTheme}>
            {themeName === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '20px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '20px' }} />
            )}
          </IconButton>
          <IconButton>
            <MoreVertIcon sx={{ fontSize: '20px' }} />
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
