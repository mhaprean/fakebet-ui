import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../redux/hooks';
import FlexBetween from '../atoms/FlexBetween';

const StyledProfileInfo = styled(Paper)`
  padding: 20px 10px;
  margin: 10px;

  ${(props) => props.theme.breakpoints.down('md')} {
    display: none;
  }
`;

const ProfileInfo = () => {
  const authState = useAppSelector((rootState) => rootState.auth);

  if (!authState.isAuth) {
    return null;
  }

  return (
    <StyledProfileInfo className="ProfileInfo" variant="outlined">
      <FlexBetween>
        <Typography variant="subtitle2">Your balance:</Typography>
        <Typography variant="subtitle2">{authState.user?.account?.current_balance} $</Typography>
      </FlexBetween>
    </StyledProfileInfo>
  );
};

export default ProfileInfo;
