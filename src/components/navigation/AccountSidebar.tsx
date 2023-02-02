import { Logout } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { logout } from '../../redux/features/authSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import FakebetLogo from '../atoms/FakebetLogo';
import FlexBetween from '../atoms/FlexBetween';
import LoginRegister from '../auth/LoginRegister';

import { Close as CloseIcon } from '@mui/icons-material';

const StyledAccountSidebar = styled('div')`
  .account-header {
    padding: 10px;
    /* padding-right: 30px; */
  }
`;

interface IPropsAccountSidebar {
  onClose?: () => void;
}

const AccountSidebar = ({ onClose = () => {} }: IPropsAccountSidebar) => {
  const authState = useAppSelector((rootState) => rootState.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <StyledAccountSidebar className="AccountSidebar">
      <FlexBetween className="account-header">
        <FakebetLogo />
        <IconButton
          onClick={() => {
            onClose();
          }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </FlexBetween>

      {authState.isAuth ? (
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      ) : (
        <LoginRegister isSidebar />
      )}
    </StyledAccountSidebar>
  );
};

export default AccountSidebar;
