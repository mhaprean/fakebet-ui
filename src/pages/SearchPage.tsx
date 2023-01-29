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
      SearchPage: {term}
      {searchResultSuccess &&
        searchResults
          .filter((match) =>
            ['soccer', 'ice-hockey', 'basketball', 'handball', 'tennis'].includes(match.tournament.sport.key)
          )
          .map((match, idx) => <SearchedMatch key={idx} match={match} />)}
    </div>
  );
};

export default SearchPage;
