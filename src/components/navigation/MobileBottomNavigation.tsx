import {
  ReceiptRounded,
  Equalizer as EqualizerIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../redux/hooks';

const StyledMobileBottomNav = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  ${(props) => props.theme.breakpoints.up('md')} {
    display: none;
  }

  .bottom-nav-item {
    max-width: 250px;
    min-width: 40px;
    padding: 0 5px;

    &.Mui-selected {
      color: ${(props) => props.theme.palette.secondary.main};
      font-size: ${(props) => props.theme.typography.caption.fontSize};
      font-weight: ${(props) => props.theme.typography.fontWeightMedium};

      .MuiBottomNavigationAction-label {
        font-size: ${(props) => props.theme.typography.caption.fontSize};
      }

      .MuiBottomNavigationAction-label {
        color: ${(props) => props.theme.palette.text.primary};
      }
    }
  }

  .MuiBottomNavigation-root {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const MobileBottomNavigation = () => {
  const [value, setValue] = useState('');

  const authState = useAppSelector((state) => state.auth);

  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <StyledMobileBottomNav className="MobileBottomNavigation" variant="outlined" square>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => handleNavigation('/')}
          className="bottom-nav-item"
          label="Home"
          value={'/'}
          icon={<ArticleIcon className="Favorites" />}
        />
        <BottomNavigationAction
          className="bottom-nav-item"
          onClick={() => handleNavigation('/tips')}
          label="Tips"
          value={'/tips'}
          icon={<EqualizerIcon />}
        />

        {authState.isAuth && (
          <BottomNavigationAction
            onClick={() => handleNavigation('/my-tickets')}
            value={'/my-tickets'}
            className="bottom-nav-item MyTickets"
            label="My Tickets"
            icon={<ReceiptRounded />}
          />
        )}

        {!authState.isAuth && (
          <BottomNavigationAction
            onClick={() => handleNavigation('/players')}
            value={'/players'}
            className="bottom-nav-item MyTickets"
            label="Players"
            icon={<PersonIcon />}
          />
        )}

        <BottomNavigationAction
          onClick={() => handleNavigation('/tickets')}
          value={'/tickets'}
          className="bottom-nav-item MyTickets"
          label="Tickets"
          icon={<ReceiptRounded />}
        />
      </BottomNavigation>
    </StyledMobileBottomNav>
  );
};

export default MobileBottomNavigation;
