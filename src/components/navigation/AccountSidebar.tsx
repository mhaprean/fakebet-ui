import { Logout } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { logout } from '../../redux/features/authSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import FakebetLogo from '../atoms/FakebetLogo';
import FlexBetween from '../atoms/FlexBetween';
import LoginRegister from '../auth/LoginRegister';

import {
  Close as CloseIcon,
  Equalizer as EqualizerIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';

const StyledAccountSidebar = styled('div')`
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .account-header {
    padding: 10px;
    /* padding-right: 30px; */
  }

  .welcome {
    padding: 10px;
    display: flex;
    align-items: center;
    border: none;

    .user-avatar {
      width: 50px;
      height: 50px;
      border: 3px solid ${(props) => props.theme.palette.primary.light};
      margin-right: 10px;
    }
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

      {authState.isAuth && (
        <Paper className="welcome" variant="outlined" square>
          {authState.user?.account && <Avatar className="user-avatar" src={authState.user.image} />}

          <div className="User">
            <Typography noWrap variant="subtitle1">
              {authState.user?.username}
            </Typography>

            <Typography noWrap variant="subtitle2">
              {authState.user?.account && authState.user?.account.current_balance + ' $'}
            </Typography>
          </div>
        </Paper>
      )}

      <Link to="/tips" onClick={() => onClose()}>
        <MenuItem>
          <ListItemIcon>
            <EqualizerIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Latest tips</ListItemText>
        </MenuItem>
      </Link>

      <Link to="/players" onClick={() => onClose()}>
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Players</ListItemText>
        </MenuItem>
      </Link>

      <Link to="/tickets" onClick={() => onClose()}>
        <MenuItem>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Tickets</ListItemText>
        </MenuItem>
      </Link>

      {authState.isAuth ? (
        <>
          <Link to="/my-tickets" onClick={() => onClose()}>
            <MenuItem>
              <ListItemIcon>
                <ArticleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Tickets</ListItemText>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout} sx={{ marginTop: 'auto' }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </>
      ) : (
        <LoginRegister isSidebar />
      )}
    </StyledAccountSidebar>
  );
};

export default AccountSidebar;
