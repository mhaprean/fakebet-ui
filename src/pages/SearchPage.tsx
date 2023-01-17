import { useLocation } from "react-router-dom";


const SearchPage = () => {

  const location = useLocation();

  const urlparams = new URLSearchParams(location.search);
  const term = urlparams.get('q');


  return <div>SearchPage: {term }</div>;
};

export default SearchPage;
