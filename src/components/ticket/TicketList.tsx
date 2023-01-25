import { Masonry } from '@mui/lab';
import { IStrapiTicket } from '../../redux/features/strapiApi';
import Ticket from './Ticket';

interface IPropsTicketList {
  tickets: IStrapiTicket[];
}

const TicketList = ({ tickets }: IPropsTicketList) => {
  return (
    <Masonry columns={{ xs: 1, sm: 2, xl: 3 }} spacing={1}>
      {tickets.map((ticket, idx) => (
        <Ticket key={idx} ticket={ticket} />
      ))}
    </Masonry>
  );
};

export default TicketList;
