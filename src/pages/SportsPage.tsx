import PageBreadcrumbs from '../components/PageBreadcrumbs';
import SportGroup from '../components/sport/SportGroup';
import { igubetSports } from '../helpers/igubetSports';
import ScrollToTop from '../hooks/ScrollToTop';

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
