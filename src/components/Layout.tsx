import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

const StyledLayout = styled('div')`
  min-height: 100vh;
  width: 100%;

  display: flex;

  .page-content {
    padding: 20px;
  }
`;

interface IPropsLayout {
  isDarkMode?: boolean;
  onThemeChange?: () => void;
}

const Layout = ({ isDarkMode = false, onThemeChange = () => {} }) => {
  return (
    <StyledLayout className="Layout">
      <Sidebar />
      <Box flexGrow={1}>
        <Navigation isDarkMode={isDarkMode} onThemeChange={onThemeChange} />
        <Box className="page-content">
          <Outlet />
        </Box>
      </Box>
    </StyledLayout>
  );
};

export default Layout;
