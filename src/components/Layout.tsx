import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const StyledLayout = styled('div')`
  min-height: 100vh;
  width: 100%;

  display: flex;
`;

const Layout = () => {
  return <StyledLayout className="Layout">
    
    <Sidebar />
    <Box flexGrow={1}>
      <div>nav</div>
      <Outlet />
    </Box>
  </StyledLayout>;
};

export default Layout;
