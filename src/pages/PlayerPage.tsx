import qs from 'qs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import PlayerHeader from '../components/player/PlayerHeader';
import PlayerStats from '../components/player/PlayerStats';
import { useGetAccountQuery, useGetFilteredAccountsQuery } from '../redux/features/strapiApi';

const PlayerPage = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('stats');

  const { data: accountResponse, isFetching } = useGetAccountQuery({
    accountId: id || '',
  });

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Players',
      to: '/players',
    },
    {
      name: accountResponse?.data.attributes.user.data.attributes.username || 'Player',
      to: '',
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      {accountResponse && (
        <>
          <PlayerHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            account={accountResponse.data.attributes}
          />
          {activeTab === 'stats' && <PlayerStats account={accountResponse.data.attributes} />}
          {activeTab === 'tickets' && <div>tickets tab</div>}
        </>
      )}
    </div>
  );
};

export default PlayerPage;
