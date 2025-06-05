import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();

  // Parse the query param from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('query');

  return (
    <div>
      <h1>Search Results</h1>
      <p>You searched for: <strong>{searchQuery}</strong></p>
      {/* Here you can add your filtering logic to show actual results */}
    </div>
  );
};

export default SearchResults;
