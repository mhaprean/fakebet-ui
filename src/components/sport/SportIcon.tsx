import {
  SportsSoccer as SportsSoccerIcon,
  SportsHockey as SportsHockeyIcon,
  SportsBasketball as SportsBasketballIcon,
  SportsHandball as SportsHandballIcon,
  SportsTennis as SportsTennisIcon,
  Sports as SportsIcon,
} from '@mui/icons-material';

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
  if (sportSlug === 'soccer') {
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
