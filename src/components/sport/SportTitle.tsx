import { Typography } from '@mui/material';
import SportIcon from './SportIcon';
import { styled } from '@mui/material/styles';

interface IPropsSportTitle {
  sportSlug: string;
  sportName: string;
}

const StyledSportTitle = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: -20px;
  margin-top: 20px;

  .MuiTypography-root {
    margin-left: 10px;
    font-weight: 500;
  }
`;

const SportTitle = ({ sportName, sportSlug }: IPropsSportTitle) => {
  return (
    <StyledSportTitle>
      <SportIcon sportSlug={sportSlug} />
      <Typography variant="subtitle1">{sportName}</Typography>
    </StyledSportTitle>
  );
};

export default SportTitle;
