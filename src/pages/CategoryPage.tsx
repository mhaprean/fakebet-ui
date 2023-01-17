import React from 'react';
import { useParams } from 'react-router-dom';
import LeagueHeader from '../components/league/LeagueHeader';
import Match from '../components/match/Match';
import PageBreadcrumbs, { IBreadcrumb } from '../components/PageBreadcrumbs';
import { useGetIguCategoryMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const CategoryPage = () => {
  const { sport, category_id, category_slug } = useParams();

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
      name: sport,
      to: `/sports/${sport}`,
    },
    {
      name: category_slug,
      to: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />
      {isMatchListLoading && <div>is loading...</div>}
      {isMatchListSucces && !isMatchListLoading &&
        matchListResponse.data.map((match, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ||
            matchListResponse.data[idx].tournament.id !== matchListResponse.data[idx - 1].tournament.id ? (
              <LeagueHeader tournament={matchListResponse.data[idx].tournament} />
            ) : null}

            <div className="match">
              <Match match={match} />
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default CategoryPage;
