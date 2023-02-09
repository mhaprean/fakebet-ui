import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import { igubetSports } from '../../helpers/igubetSports';
import SportIcon from '../sport/SportIcon';

const StyledNavigationTabs = styled('div')`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
  .sport-button {
    border-radius: 0;
    flex-grow: 1;
    border-bottom: 3px solid transparent;
    color: ${(props) => props.theme.palette.text.secondary};
    min-width: 40px;

    &.selected {
      border-bottom: 3px solid ${(props) => props.theme.palette.secondary.main};
      color: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

interface IPropsNavigationTabs {
  activeSport?: string;
  onSportChange?: (sport: string) => void;
}

const NavigationTabs = ({ activeSport = 'soccer', onSportChange = () => {} }: IPropsNavigationTabs) => {
  return (
    <StyledNavigationTabs className="NavigationTabs">
      {igubetSports.map((sport, idx) => (
        <Button
          key={idx}
          onClick={() => onSportChange(sport.key)}
          className={classNames('sport-button', { selected: activeSport === sport.key })}
        >
          <SportIcon sportSlug={sport.key} />
        </Button>
      ))}
    </StyledNavigationTabs>
  );
};

export default NavigationTabs;
