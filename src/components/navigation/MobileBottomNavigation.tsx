import { ReceiptRounded, Equalizer as EqualizerIcon, Article as ArticleIcon } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledMobileBottomNav = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${(props) => props.theme.breakpoints.up('md')} {
    display: none;
  }

  .bottom-nav-item {
    max-width: 250px;
    min-width: 30px;
  }

  .MuiBottomNavigation-root {
    background: ${props => props.theme.palette.background.default};
  }
`;

const MobileBottomNavigation = () => {
  const [value, setValue] = useState('');

  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {};

  return (
    <StyledMobileBottomNav className="MobileBottomNavigation" variant='outlined' square>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => handleNavigation('/favorites')}
          className="bottom-nav-item"
          label="Favorites"
          value={'/favorites'}
          icon={<ArticleIcon className="Favorites" />}
        />
        <BottomNavigationAction
          className="bottom-nav-item"
          onClick={() => handleNavigation('/main')}
          label="Main"
          value={'/main'}
          icon={<EqualizerIcon />}
        />

        <BottomNavigationAction
          onClick={() => handleNavigation('/my-tickets')}
          value={'/my-tickets'}
          className="bottom-nav-item MyTickets"
          label="My Tickets"
          icon={<ReceiptRounded />}
        />

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
