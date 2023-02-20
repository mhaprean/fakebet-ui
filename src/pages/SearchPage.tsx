import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SearchedMatch from '../components/search/SearchedMatch';
import { useIguSearchQuery } from '../redux/features/igubetApi';

const SearchPage = () => {
  const location = useLocation();

  const urlparams = new URLSearchParams(location.search);
  const term = urlparams.get('q');

  const {
    data: searchResults,
    isSuccess: searchResultSuccess,
    isFetching: isSearchResultsFetching,
  } = useIguSearchQuery({ term: term || '' }, { skip: !term || term.length < 3 });

  return (
    <div>
      <Typography variant="subtitle1">Search results:</Typography>

      {searchResultSuccess &&
        searchResults
          .filter((match) => match.tournament.sport.key === 'soccer')
          .map((match, idx) => <SearchedMatch key={idx} match={match} />)}
    </div>
  );
};

export default SearchPage;
