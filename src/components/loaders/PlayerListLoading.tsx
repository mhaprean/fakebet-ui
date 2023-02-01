import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayerSkeleton from './PlayerSkeleton';

const StyledPlayerListLoading = styled('div')`
  width: 100%;

  .Heading {
    display: flex;
    align-items: center;
    height: 42px;
    background: ${(props) => props.theme.palette.background.paper};
    padding: 10px;
  }

  .Players {
    .PlayerSkeleton {
      &:nth-of-type(even) {
        background: ${(props) => props.theme.palette.background.paper};
      }
    }
  }
`;

export interface IPropsPlayerListLoading {
  playersCount: number;
}

const PlayerListLoading = ({ playersCount }: IPropsPlayerListLoading) => {
  const players = [
    <PlayerSkeleton key={1} nameWidth={120} balanceWidth={100} />,
    <PlayerSkeleton key={2} nameWidth={100} balanceWidth={90} />,
    <PlayerSkeleton key={3} nameWidth={80} balanceWidth={80} />,
    <PlayerSkeleton key={4} nameWidth={90} balanceWidth={100} />,
    <PlayerSkeleton key={5} nameWidth={110} balanceWidth={90} />,
    <PlayerSkeleton key={6} nameWidth={75} balanceWidth={75} />,
    <PlayerSkeleton key={7} nameWidth={100} balanceWidth={90} />,
    <PlayerSkeleton key={8} nameWidth={80} balanceWidth={80} />,
    <PlayerSkeleton key={9} nameWidth={90} balanceWidth={100} />,
    <PlayerSkeleton key={10} nameWidth={110} balanceWidth={90} />,
    <PlayerSkeleton key={11} nameWidth={120} balanceWidth={100} />,
    <PlayerSkeleton key={12} nameWidth={100} balanceWidth={90} />,
    <PlayerSkeleton key={13} nameWidth={80} balanceWidth={80} />,
    <PlayerSkeleton key={14} nameWidth={90} balanceWidth={100} />,
    <PlayerSkeleton key={15} nameWidth={110} balanceWidth={90} />,
    <PlayerSkeleton key={16} nameWidth={75} balanceWidth={75} />,
    <PlayerSkeleton key={17} nameWidth={100} balanceWidth={90} />,
    <PlayerSkeleton key={18} nameWidth={80} balanceWidth={80} />,
    <PlayerSkeleton key={19} nameWidth={90} balanceWidth={100} />,
    <PlayerSkeleton key={20} nameWidth={110} balanceWidth={90} />,
    <PlayerSkeleton key={21} nameWidth={120} balanceWidth={100} />,
    <PlayerSkeleton key={22} nameWidth={100} balanceWidth={90} />,
    <PlayerSkeleton key={23} nameWidth={80} balanceWidth={80} />,
    <PlayerSkeleton key={24} nameWidth={90} balanceWidth={100} />,
    <PlayerSkeleton key={25} nameWidth={110} balanceWidth={90} />,
    <PlayerSkeleton key={26} nameWidth={75} balanceWidth={75} />,
    <PlayerSkeleton key={27} nameWidth={100} balanceWidth={90} />,
    <PlayerSkeleton key={28} nameWidth={80} balanceWidth={80} />,
    <PlayerSkeleton key={29} nameWidth={90} balanceWidth={100} />,
    <PlayerSkeleton key={30} nameWidth={90} balanceWidth={100} />,
  ];
  return (
    <StyledPlayerListLoading className="PlayerListLoading">
      <div className="Heading">
        <Skeleton variant="text" width={50} />
        <Skeleton variant="text" width={100} style={{ marginLeft: 'auto' }} />
      </div>

      <div className="Players">
        {Array(playersCount)
          .fill(0)
          .map((number, index) => players[index])}
      </div>
    </StyledPlayerListLoading>
  );
};

export default PlayerListLoading;
