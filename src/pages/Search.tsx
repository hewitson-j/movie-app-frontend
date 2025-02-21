import { useState } from "react";
import Title from "../components/Title";
import SearchProvider, {
  useSearchProviderContext,
} from "../context/SearchProvider";
import MoviePoster from "../components/MoviePoster";
import "./Search.css";

export default function Search() {
  return (
    <SearchProvider>
      <SearchPage />
    </SearchProvider>
  );
}

function SearchPage() {
  const { data, loading, error, setSearchTerm } = useSearchProviderContext();

  console.log(data);

  const [searchText, setSearchText] = useState("");

  return (
    <div className="search-page page">
      <Title size="h2">Search</Title>
      <p>Use the below form to search for a movie!</p>
      <div className="search-box">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button disabled={loading} onClick={() => setSearchTerm(searchText)}>
          Search
        </button>
      </div>
      {loading ? (
        <>Loading...</>
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
                  />
                );
              })}
            </div>
          ) : (
            "Search results will appear here!"
          )}
        </div>
      )}
      {error ? <>Error!</> : <></>}
    </div>
  );
}
