import { useState } from "react";
import Title from "../components/Title";
import SearchProvider, {
  useSearchProviderContext,
} from "../context/SearchProvider";
import MoviePoster from "../components/MoviePoster";
import "./Search.css";
import LoadingScreen from "../components/LoadingScreen";

export default function Search() {
  return (
    <SearchProvider>
      <SearchPage />
    </SearchProvider>
  );
}

function SearchPage() {
  const { data, loading, error, setSearchTerm } = useSearchProviderContext();

  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="search-page page">
      <Title size="h2">Search</Title>
      <p>Use the below form to search for a movie!</p>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search term here"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              setSearchTerm(searchText);
              if (!hasSearched) setHasSearched(true);
            }
          }}
        />
        <button
          disabled={loading}
          onClick={() => {
            setSearchTerm(searchText);
            if (!hasSearched) setHasSearched(true);
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="search-results">
          {data && data?.length > 0 ? (
            <div className="search-results-body">
              {data.map((entry) => {
                return (
                  <MoviePoster
                    key={entry.id}
                    id={entry.id}
                    posterPath={entry.poster_path}
                    title={entry.title}
                    overview={entry.overview}
                    type="movie"
                  />
                );
              })}
            </div>
          ) : (
            <h2 className="search-results-placeholder">
              {hasSearched
                ? "Zero results found."
                : "Search results will appear here!"}
            </h2>
          )}
        </div>
      )}
      {error ? <>Error!</> : <></>}
    </div>
  );
}
