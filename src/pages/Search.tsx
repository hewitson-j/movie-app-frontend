import { useState } from "react";
import Title from "../components/Title";
import SearchProvider, {
  useSearchProviderContext,
} from "../context/SearchProvider";
import MoviePoster from "../components/MoviePoster";
import "./Search.css";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

export default function Search() {
  return (
    <SearchProvider>
      <SearchPage />
    </SearchProvider>
  );
}

function SearchPage() {
  const {
    data,
    loading,
    error,
    setSearchTerm,
    setType,
    type,
    setSafePage,
    totalResults,
    page,
  } = useSearchProviderContext();

  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  let count = 0;

  return (
    <div className="search-page page">
      <Title size="h2">Search</Title>
      <p>Use the below form to search for a movie!</p>
      <form>
        <div className="search-toggle-section">
          <h3>Search by:</h3>
          <div className="search-mode-buttons">
            <button
              disabled={type === "movie"}
              onClick={() => setType("movie")}
            >
              Movie
            </button>
            <button disabled={type === "tv"} onClick={() => setType("tv")}>
              TV Show
            </button>
          </div>
        </div>
        <div className="search-box">
          <input
            disabled={error}
            type="text"
            placeholder={`Search by ${
              type === "movie" ? "movie" : "tv show"
            } title here`}
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
            disabled={loading || error}
            onClick={() => {
              setSearchTerm(searchText);
              if (!hasSearched) setHasSearched(true);
            }}
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="search-results">
          {data && data?.length > 0 ? (
            <>
              <div className="search-results-body">
                {data.map((entry) => {
                  count++;
                  return (
                    <MoviePoster
                      key={`${entry.id}-${count}`}
                      id={entry.id}
                      posterPath={entry.poster_path}
                      title={entry.title}
                      overview={entry.overview}
                      type={type}
                    />
                  );
                })}
              </div>
              {data.length < totalResults && (
                <div className="search-result-nav-buttons">
                  <button
                    disabled={page === 1}
                    onClick={() => setSafePage(page - 1)}
                  >
                    Prev
                  </button>
                  <button
                    disabled={page * 20 > totalResults}
                    onClick={() => setSafePage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <h2 className="search-results-placeholder">
              {hasSearched
                ? "Zero results found."
                : "Search results will appear here!"}
            </h2>
          )}
        </div>
      )}
      {error ? (
        <ErrorScreen
          customTitle="Error Searching"
          customMessage="It looks like we're having a hard time running your search. Please refresh the page or come back later."
          showButton={false}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
