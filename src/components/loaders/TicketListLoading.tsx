import { Masonry } from '@mui/lab';
import { styled } from '@mui/material/styles';
import TicketSkeleton from './TicketSkeleton';

const StyledTicketListLoading = styled('div')`
  width: 100%;
  .TicketSkeleton {
    margin-top: 5px;
  }
  margin-bottom: 10px;
`;

export interface IPropsTicketListLoading {
  ticketsNr: number;
}

const TicketListLoading = ({ ticketsNr }: IPropsTicketListLoading) => {
  const tickets = [
    <TicketSkeleton key={1} homeWidth={60} awayWidth={100} totalBets={2} />,
    <TicketSkeleton key={2} homeWidth={45} awayWidth={110} totalBets={1} />,
    <TicketSkeleton key={3} homeWidth={80} awayWidth={55} totalBets={1} />,
    <TicketSkeleton key={4} homeWidth={30} awayWidth={80} totalBets={6} />,
    <TicketSkeleton key={5} homeWidth={70} awayWidth={60} totalBets={4} />,
    <TicketSkeleton key={6} homeWidth={57} awayWidth={98} totalBets={2} />,
    <TicketSkeleton key={7} homeWidth={68} awayWidth={43} totalBets={8} />,
    <TicketSkeleton key={8} homeWidth={100} awayWidth={62} totalBets={1} />,
    <TicketSkeleton key={9} homeWidth={115} awayWidth={100} totalBets={4} />,
    <TicketSkeleton key={10} homeWidth={128} awayWidth={85} totalBets={2} />,
  ];

  return (
    <StyledTicketListLoading className="TicketListLoading">
      <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
        {Array(ticketsNr)
          .fill(0)
          .map((number, index) => tickets[index])}
      </Masonry>
    </StyledTicketListLoading>
  );
};

export default TicketListLoading;
