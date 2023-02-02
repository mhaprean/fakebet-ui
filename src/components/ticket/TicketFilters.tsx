import { styled } from '@mui/material/styles';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DropdownList from '../atoms/DropdownList';

const StyledTicketFilters = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

interface IPropsTicketFilters {
  perPage: string;
  status: string;
  onStatusChange: (status: string) => void;
  onPerPageChange: (num: string) => void;
  onPageChange: (page: number) => void;
}

const TicketFilters = ({
  perPage = '10',
  status = 'all',
  onStatusChange,
  onPageChange,
  onPerPageChange,
}: IPropsTicketFilters) => {
  return (
    <StyledTicketFilters className="TicketFilters">
      <FilterListIcon />

      <DropdownList
        value={status}
        onChange={(newValue: string) => {
          onStatusChange(newValue);
          onPageChange(1);
        }}
        items={[
          { value: 'all', label: 'All Tickets' },
          { value: 'pending', label: 'Pending Tickets' },
          { value: 'winning', label: 'Winning Tickets' },
          { value: 'lost', label: 'Lost Tickets' },
        ]}
      />

      <DropdownList
        value={perPage}
        onChange={(newValue: string) => {
          onPerPageChange(newValue);
          onPageChange(1);
        }}
        items={[
          { value: '10', label: 'Per page: 10' },
          { value: '20', label: 'Per page: 20' },
          { value: '30', label: 'Per page: 30' },
        ]}
      />
    </StyledTicketFilters>
  );
};

export default TicketFilters;
