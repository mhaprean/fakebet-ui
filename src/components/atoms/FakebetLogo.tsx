import { Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledLogo = styled(Typography)`
  font-size: 16px;
  flex-shrink: 0;
  color: ${(props) => props.theme.navigation.text};

  span {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const FakebetLogo = () => {
  return (
    <StyledLogo className="FakebetLogo" variant="h6" noWrap>
      Fake<span>Bet</span>
    </StyledLogo>
  );
};

export default FakebetLogo;
