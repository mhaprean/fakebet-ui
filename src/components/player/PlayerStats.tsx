import { IAccountAttributes } from '../../redux/features/strapiApi';
import PieChartCard from './PieChartCard';

interface IPropsPlayerStats {
  account: IAccountAttributes;
}

const PlayerStats = ({ account }: IPropsPlayerStats) => {
  return (
    <div>
      <PieChartCard
        winning_tickets={account.winning_tickets}
        lose_tickets={account.losing_tickets}
        pending_tickets={account.pending_tickets}
      />
    </div>
  );
};

export default PlayerStats;
