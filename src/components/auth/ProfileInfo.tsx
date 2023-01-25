import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../redux/hooks';
import FlexBetween from '../atoms/FlexBetween';

const StyledProfileInfo = styled(Paper)`
  padding: 20px 10px;
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
        <Typography variant="subtitle2">{authState.user?.current_balance} $</Typography>
      </FlexBetween>
    </StyledProfileInfo>
  );
};

export default ProfileInfo;
