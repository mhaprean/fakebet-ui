import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface IPropsPlayerSkeleton {
  nameWidth: number;
  balanceWidth: number;
}

const StyledPlayerSkeleton = styled('div')`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const PlayerSkeleton = ({ nameWidth, balanceWidth }: IPropsPlayerSkeleton) => {
  return (
    <StyledPlayerSkeleton className="PlayerSkeleton">
      <Skeleton variant="text" width={10} />
      <Skeleton variant="circular" width={30} height={30} style={{ marginLeft: 10, marginRight: 10 }} />

      <Skeleton variant="text" width={nameWidth} />
      <Skeleton variant="text" width={balanceWidth} style={{ marginLeft: 'auto' }} />
    </StyledPlayerSkeleton>
  );
};

export default PlayerSkeleton;
