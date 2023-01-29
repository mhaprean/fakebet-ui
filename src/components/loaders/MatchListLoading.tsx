import { styled } from '@mui/material/styles';
import MatchSkeleton from './MatchSkeleton';

const StyledMatchListLoading = styled('div')`
  .MatchSkeleton {
    margin-top: 10px;
  }
  margin-bottom: 10px;
`;

export interface IPropsMatchListLoading {
  matchNr: number;
}

const MatchListLoading = ({ matchNr }: IPropsMatchListLoading) => {
  const games = [
    <MatchSkeleton key={1} homeWidth={60} awayWidth={100} />,
    <MatchSkeleton key={2} homeWidth={45} awayWidth={110} />,
    <MatchSkeleton key={3} homeWidth={80} awayWidth={55} />,
    <MatchSkeleton key={4} homeWidth={30} awayWidth={80} />,
    <MatchSkeleton key={5} homeWidth={70} awayWidth={60} />,
    <MatchSkeleton key={6} homeWidth={57} awayWidth={98} />,
    <MatchSkeleton key={7} homeWidth={68} awayWidth={43} />,
    <MatchSkeleton key={8} homeWidth={100} awayWidth={62} />,
    <MatchSkeleton key={9} homeWidth={115} awayWidth={100} />,
    <MatchSkeleton key={10} homeWidth={128} awayWidth={85} />,
  ];

  return (
    <StyledMatchListLoading className="MatchListLoading">
      {Array(matchNr)
        .fill(0)
        .map((number, index) => games[index])}
    </StyledMatchListLoading>
  );
};

export default MatchListLoading;
