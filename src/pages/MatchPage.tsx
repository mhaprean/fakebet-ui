import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchPageHeaderSkeleton from '../components/loaders/MatchPageHeaderSkeleton';
import MarketsTab from '../components/match/MarketsTab';
import MatchPageHeader from '../components/match/MatchPageHeader';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import TicketsTab from '../components/ticket/TicketsTab';
import ScrollToTop from '../hooks/ScrollToTop';
import { useGetIguMatchesQuery, useGetIguMatchMarketsQuery } from '../redux/features/igubetApi';
import { IIgubetMatch } from '../redux/features/igubetTypes';

const StyledMatchPage = styled('div')`
  max-width: 100%;

  .content {
    max-width: 100%;
  }
`;

const MatchPage = () => {
  const { league_id, event_id } = useParams();

  const [match, setMatch] = useState<IIgubetMatch | null>(null);

  const [activeTab, setActiveTab] = useState('odds');

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetIguMatchesQuery(
    {
      tournament_id: league_id,
      sport_key: 'soccer',
      limit: 50,
    },
    { skip: !league_id }
  );

  const breadcrumbsArray: IBreadcrumb[] = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Offer',
      to: `/offer`,
    },
    {
      name: match?.tournament.category.name,
      to: `/offer/${match?.tournament.category.id}/${match?.tournament.category.slug}`,
    },
    {
      name: match?.tournament.name,
      to: `/offer/${match?.tournament.category.id}/${match?.tournament.category.slug}/${match?.tournament.id}/${match?.tournament.slug}`,
    },
    {
      name: `${match?.competitors.home.name} - ${match?.competitors.away.name}`,
      to: '',
    },
  ];

  useEffect(() => {
    if (isMatchListSucces) {
      const currentMatch = matchListResponse.data.find((game) => game.id + '' === event_id);

      if (currentMatch) {
        setMatch(currentMatch);
      }
    }
  }, [isMatchListSucces, matchListResponse]);

  return (
    <StyledMatchPage className="MatchPage">
      <ScrollToTop />
      {match && <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />}

      {isMatchListLoading && <MatchPageHeaderSkeleton />}

      {isMatchListSucces && (
        <MatchPageHeader match={match} activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      <div className="content">
        {activeTab === 'odds' && match && <MarketsTab match={match} />}
        {activeTab === 'tickets' && <TicketsTab matchId={match?.id || 1} />}
      </div>
    </StyledMatchPage>
  );
};

export default MatchPage;
