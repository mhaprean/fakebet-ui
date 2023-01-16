import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetLeaguesQuery } from '../redux/features/oddspediaApi';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import { useGetIguCategoriesQuery } from '../redux/features/igubetApi';

const StyledLayout = styled('div')`
  min-height: 100vh;
  width: 100%;

  .layout-content {
    display: flex;
    padding-top: 50px;
  }

  .page-content {
    padding: 10px;
  }
`;

interface IPropsLayout {
  isDarkMode?: boolean;
  onThemeChange?: () => void;
}

const Layout = ({ isDarkMode = false, onThemeChange = () => {} }: IPropsLayout) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: topLeaguesResponse } = useGetLeaguesQuery({ topLeaguesOnly: 1 });

  const { data: categoriesResponseIgu, isLoading: isCategoriesIguLoading } = useGetIguCategoriesQuery({
    sport_id: 1,
  });

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledLayout className="Layout">
      <Navigation isDarkMode={isDarkMode} onThemeChange={onThemeChange} onMenuToggle={handleDrawerToggle} />
      <Box className="layout-content">
        <Box className="left-sidebar" sx={{ width: { xs: 0, md: 250 }, flexShrink: 0 }}>
          <Drawer
            variant="temporary"
            open={menuOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundImage: 'none' },
            }}
          >
            <Sidebar
              isTemporary={true}
              onDrawerClose={handleDrawerToggle}
              leagues={topLeaguesResponse?.data || []}
              categories={categoriesResponseIgu?.data || []}
            />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 250,
                height: 'calc(100% - 50px)',
                marginTop: '52px',
              },
            }}
            open
          >
            <Sidebar
              leagues={topLeaguesResponse?.data || []}
              categories={categoriesResponseIgu?.data || []}
            />
          </Drawer>
        </Box>

        <Box sx={{ flexGrow: 1, width: { xs: '100%', md: `calc(100% - ${250}px)` } }}>
          <Box className="page-content">
            <Outlet />
          </Box>
        </Box>

        <Box className="right-sidebar" sx={{ width: { xs: 0, lg: 320 }, flexShrink: 0 }}></Box>
      </Box>
    </StyledLayout>
  );
};

export default Layout;
