import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

const StyledLayout = styled('div')`
  min-height: 100vh;
  width: 100%;

  display: flex;

  .page-content {
    padding: 10px;
  }
`;

interface IPropsLayout {
  isDarkMode?: boolean;
  onThemeChange?: () => void;
}

const Layout = ({ isDarkMode = false, onThemeChange = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledLayout className="Layout">
      <Box sx={{ width: { xs: 0, sm: 250}, flexShrink: 0}}>
        <Drawer
          variant="temporary"
          open={menuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundImage: 'none' },
          }}
        >
          <Sidebar />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box sx={{ flexGrow: 1, width: { xs: '100%',sm: `calc(100% - ${250}px)` }, paddingTop: '50px' }}>
        <Navigation isDarkMode={isDarkMode} onThemeChange={onThemeChange} onMenuToggle={handleDrawerToggle} />
        <Box className="page-content">
          <Outlet />
        </Box>
      </Box>
    </StyledLayout>
  );
};

export default Layout;
