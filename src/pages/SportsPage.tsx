import PageBreadcrumbs from '../components/PageBreadcrumbs';
import SportGroup from '../components/sport/SportGroup';
import SportTitle from '../components/sport/SportTitle';
import { igubetSports } from '../helpers/igubetSports';
import ScrollToTop from '../hooks/ScrollToTop';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';

const SportsPage = () => {
  const sportsBreadcrumbs = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Sports',
      to: `/sports`,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={sportsBreadcrumbs} />
      <ScrollToTop />

      {igubetSports.map((sport) => (
        <SportGroup sport={sport} key={sport.id} />
      ))}
    </div>
  );
};

export default SportsPage;
