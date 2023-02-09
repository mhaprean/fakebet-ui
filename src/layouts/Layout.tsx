import { Box, Chip, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation';
import Sidebar from '../components/navigation/Sidebar';
import SportNavigation from '../components/navigation/SportNavigation';
import Betslip from '../components/betslip/Betslip';
import MobileBottomNavigation from '../components/navigation/MobileBottomNavigation';
import ProfileInfo from '../components/auth/ProfileInfo';

const StyledLayout = styled('div')`
  min-height: 100vh;
  width: 100%;

  .layout-content {
    display: flex;
    padding-top: 50px;
  }

  .page-content {
    padding: 10px;
    padding-bottom: 180px;
  }

  .right-sidebar-content {
    &.sticky {
      ${(props) => props.theme.breakpoints.up('md')} {
        position: sticky;
        top: 64px;
        width: 100%;
      }
    }
  }

  .right-sidebar {
    flex-basis: 0;
    width: 0;

    ${(props) => props.theme.breakpoints.up('md')} {
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 320px;
      max-width: 320px;
      display: block;
    }
  }
`;

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledLayout className="Layout">
      <Navigation onMenuToggle={handleDrawerToggle} />
      <Box className="layout-content">
        <Box className="left-sidebar" sx={{ width: { xs: 0, lg: 250 }, flexShrink: 0 }}>
          <Drawer
            variant="temporary"
            open={menuOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundImage: 'none' },
            }}
          >
            <Sidebar isTemporary={true} onDrawerClose={handleDrawerToggle} />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 250,
                height: 'calc(100% - 50px)',
                marginTop: '52px',
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        </Box>

        <Box sx={{ flexGrow: 1, width: { xs: '100%', lg: `calc(100% - ${250}px)` } }}>
          <Box className="page-content">
            {/* <SportNavigation /> */}
            <Outlet />
          </Box>
        </Box>

        <Box className="right-sidebar">
          <div className="right-sidebar-content sticky">
            <ProfileInfo />
            <Betslip />
          </div>
        </Box>
      </Box>
      <MobileBottomNavigation />
    </StyledLayout>
  );
};

export default Layout;
