import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DatepickerButton from '../components/atoms/DatepickerButton';
import DropdownList from '../components/atoms/DropdownList';
import FlexBetween from '../components/atoms/FlexBetween';
import PagePagination from '../components/atoms/PagePagination';
import LeagueHeader from '../components/league/LeagueHeader';
import SportPageLoading from '../components/loaders/SportPageLoading';
import Match from '../components/match/Match';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import { igubetSports } from '../helpers/igubetSports';
import { useGetIguSportMatchesQuery } from '../redux/features/igubetApi';
import { timeFormatService } from '../services/timeFormaterService';

const SportPage = () => {
  const { sport } = useParams();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);

  const [day, setDay] = useState(searchParams.get('day') || new Date().toISOString());

  const [sportFilter, setSportFilter] = useState(sport || 'soccer');

  const iguSport = igubetSports.find((sp) => sp.key === sport);

  const dates = timeFormatService.getStartEndDate(day);

  useEffect(() => {
    setPage(1);
  }, [sport]);

  const {
    data: matchListResponse,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetIguSportMatchesQuery({
    sport_key: sport,
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
      name: 'Sports',
      to: `/sports`,
    },
    {
      name: iguSport?.name,
      to: '',
    },
  ];

  const sportList = igubetSports.map((sport) => {
    return {
      value: sport.key,
      label: sport.name,
    };
  });

  return (
    <div>
      <PageBreadcrumbs breadcrumbs={breadcrumbsArray} />

      <FlexBetween>
        <DropdownList
          value={sportFilter}
          onChange={(newValue: string) => {
            setSportFilter(newValue);
            setPage(1);
            navigate(`/sports/${newValue}`);
          }}
          items={sportList}
        />

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

      {isSuccess &&
        !isFetching &&
        matchListResponse.data.map((match, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ||
            matchListResponse.data[idx].tournament.id !== matchListResponse.data[idx - 1].tournament.id ? (
              <LeagueHeader tournament={matchListResponse.data[idx].tournament} />
            ) : null}

            <Match match={match} />
          </React.Fragment>
        ))}

      {isFetching && <SportPageLoading />}
    </div>
  );
};

export default SportPage;
