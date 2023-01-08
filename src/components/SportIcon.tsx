import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsIcon from '@mui/icons-material/Sports';

interface IPropsSportIcon {
  sportSlug?: string;
}

const SportIcon = ({ sportSlug }: IPropsSportIcon) => {
  if (sportSlug === 'ice-hockey') {
    return <SportsHockeyIcon className="SportIcon" />;
  }
  if (sportSlug === 'basketball') {
    return <SportsBasketballIcon className="SportIcon" />;
  }
  if (sportSlug === 'football') {
    return <SportsSoccerIcon className="SportIcon" />;
  }
  if (sportSlug === 'handball') {
    return <SportsHandballIcon className="SportIcon" />;
  }
  if (sportSlug === 'tennis') {
    return <SportsTennisIcon className="SportIcon" />;
  }
  return <SportsIcon className="SportIcon" />;
};

export default SportIcon;
