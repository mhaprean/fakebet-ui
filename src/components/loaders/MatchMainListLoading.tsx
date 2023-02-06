import { Masonry } from '@mui/lab';
import { styled } from '@mui/material/styles';
import MatchMainSkeleton from './MatchMainSkeleton';
import MatchSkeleton from './MatchSkeleton';

const StyledMatchMainListLoading = styled('div')`
  width: 100%;
  .MatchSkeleton {
    margin-top: 5px;
  }
  margin-bottom: 10px;
`;

export interface IPropsMatchMainListLoading {
  matchNr: number;
}

const MatchMainListLoading = ({ matchNr }: IPropsMatchMainListLoading) => {
  const games = [
    <MatchMainSkeleton key={1} homeWidth={60} awayWidth={100} totalBets={4} />,
    <MatchMainSkeleton key={2} homeWidth={45} awayWidth={110} totalBets={2} />,
    <MatchMainSkeleton key={3} homeWidth={80} awayWidth={55} totalBets={1} />,
    <MatchMainSkeleton key={4} homeWidth={30} awayWidth={80} totalBets={6} />,
    <MatchMainSkeleton key={5} homeWidth={70} awayWidth={60} totalBets={4} />,
    <MatchMainSkeleton key={6} homeWidth={57} awayWidth={98} totalBets={2} />,
    <MatchMainSkeleton key={7} homeWidth={68} awayWidth={43} totalBets={8} />,
    <MatchMainSkeleton key={8} homeWidth={100} awayWidth={62} totalBets={1} />,
    <MatchMainSkeleton key={9} homeWidth={115} awayWidth={100} totalBets={4} />,
    <MatchMainSkeleton key={10} homeWidth={128} awayWidth={85} totalBets={2} />,
  ];

  return (
    <StyledMatchMainListLoading className="MatchMainListLoading">
      <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
        {Array(matchNr)
          .fill(0)
          .map((number, index) => games[index])}
      </Masonry>
    </StyledMatchMainListLoading>
  );
};

export default MatchMainListLoading;
