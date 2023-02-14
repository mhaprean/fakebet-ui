import React from 'react';
import { useParams } from 'react-router-dom';
import LeagueHeader from '../components/league/LeagueHeader';
import SportPageLoading from '../components/loaders/SportPageLoading';
import Match from '../components/match/Match';
import MatchList from '../components/match/MatchList';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import { useGetIguCategoryMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const CategoryPage = () => {
  const { category_id, category_slug } = useParams();

  const dates = timeFormatService.getStartEnd(7);

  const {
    data: matchListResponse,
    error: matchListError,
    isFetching: isMatchListLoading,
    isSuccess: isMatchListSucces,
  } = useGetIguCategoryMatchesQuery(
    {
      category_id: category_id,
      start_from: dates.start,
      start_to: dates.end,
    },
    { skip: !category_id }
  );

  const breadcrumbsArray: IBreadcrumb[] = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: category_slug,
      to: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      {isMatchListLoading && <SportPageLoading />}

      {isMatchListSucces && !isMatchListLoading && <MatchList matches={matchListResponse.data || []} />}
    </div>
  );
};

export default CategoryPage;
