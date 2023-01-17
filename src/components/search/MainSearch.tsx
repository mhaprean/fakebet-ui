import { ArrowBack as ArrowBackIcon, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { useIguSearchQuery } from '../../redux/features/igubetApi';
import Match from '../match/Match';

interface IPropsMainSearch {
  onClose: () => void;
}

const StyledMainSearch = styled('div')`
  .search-header {
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.palette.background.paper};
  }

  .input-field {
    background-color: ${(props) => alpha(props.theme.palette.common.white, 0.15)};
    /* background-color: ${(props) => props.theme.palette.background.paper}; */
    border-radius: 3px;
    margin: 0 10px;
    padding: 2px 7px;
    flex-grow: 1;
  }

  .close-icon {
    color: ${(props) => props.theme.palette.text.secondary};
  }

  .search-icon {
    background: ${(props) => props.theme.palette.primary.light};
  }
`;

const MainSearch = ({ onClose }: IPropsMainSearch) => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>();

  const debouncedTerm = useDebounce(searchTerm, 500); // wait 500 ms before doing the actual search

  const {
    data: searchResults,
    isSuccess: searchResultSuccess,
    isFetching: isSearchResultsFetching,
  } = useIguSearchQuery({ term: debouncedTerm }, { skip: debouncedTerm.length < 3 });

  const handleClose = () => {
    onClose();
  };

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const submitSearch = () => {
    if (searchTerm.length > 2) {
      onClose();
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <StyledMainSearch className="MainSearch">
      <form onSubmit={handleSubmit}>
        <div className="search-header">
          <IconButton onClick={handleClose} size="small">
            <ArrowBackIcon />
          </IconButton>

          <InputBase
            inputRef={inputRef}
            autoFocus
            value={searchTerm}
            className="input-field"
            placeholder="Search for team or league..."
            onChange={(event) => setSearchTerm(event.target.value)}
            endAdornment={
              <IconButton size="small" onClick={handleClear}>
                <CloseIcon className="close-icon" />
              </IconButton>
            }
          />

          <IconButton className="search-icon" size="small" onClick={submitSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </form>
      <div className="search-body">
        {isSearchResultsFetching && <div>is loading...</div>}
        {searchResultSuccess && searchResults.map((match, idx) => <Match key={idx} match={match} />)}
      </div>
    </StyledMainSearch>
  );
};

export default MainSearch;
