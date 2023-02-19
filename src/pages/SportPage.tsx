import { lazy, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlexBetween from '../components/atoms/FlexBetween';
import PagePagination from '../components/atoms/PagePagination';
import SportPageLoading from '../components/loaders/SportPageLoading';
import MatchList from '../components/match/MatchList';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const DatepickerButton = lazy(() => import('../components/atoms/DatepickerButton'));

const SportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [day, setDay] = useState(searchParams.get('day') || new Date().toISOString());

  const dates = timeFormatService.getStartEndDate(day);

  const {
    data: matchListResponse,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetIguSportMatchesQuery({
    sport_key: 'soccer',
    start_from: dates.start,
    start_to: dates.end,
    page: page,
  });

  const breadcrumbsArray = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Offer',
      to: `/offer`,
    },
  ];

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <FlexBetween>
        <DatepickerButton
          selectedDate={day}
          onChangeDate={(newDate) => {
            console.log('new date: ', newDate);
            setPage(1);
            setDay(newDate);
            setSearchParams({ day: timeFormatService.formatDateForUrl(newDate) });
          }}
        />
      </FlexBetween>

      <PagePagination
        total={matchListResponse?.pagination.total || 0}
        totalPages={matchListResponse?.pagination.last_page || 1}
        currentPage={page}
        onPageChange={setPage}
      />

      {isSuccess && !isFetching && <MatchList matches={matchListResponse.data || []} />}

      {isFetching && <SportPageLoading />}
    </div>
  );
};

export default SportPage;
