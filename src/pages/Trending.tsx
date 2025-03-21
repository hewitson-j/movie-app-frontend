import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import MoviePoster from "../components/MoviePoster";
import Title from "../components/Title";
import TrendingProvider, {
  useTrendingContext,
  useTrendingStateContext,
} from "../context/TrendingProvider";
import "./Trending.css";

export default function Trending() {
  return (
    <TrendingProvider>
      <TrendingPage />
    </TrendingProvider>
  );
}

function TrendingPage() {
  const { page, setPage, type, setType } = useTrendingStateContext();
  const { trendingMovies, loading, error } = useTrendingContext();

  let count = 0;

  return (
    <div className="trending-page page">
      <Title size="h1">What's Trending</Title>
      {loading && trendingMovies && trendingMovies?.length <= 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="trending-filter">
            <h2>Filter by:</h2>
            <div className="trending-type-toggle">
              <button
                disabled={type === "movie"}
                onClick={() => setType("movie")}
              >
                Movies
              </button>
              <button disabled={type === "tv"} onClick={() => setType("tv")}>
                TV Shows
              </button>
            </div>
          </div>
          <div className="trending-posters">
            {trendingMovies?.map((movie) => {
              count++;
              return (
                <MoviePoster
                  key={`${movie.id}-${count}`}
                  id={movie.id}
                  posterPath={movie.poster_path}
                  title={movie.title || movie.name || ""}
                  overview={movie.overview}
                  type={type}
                />
              );
            })}
          </div>
          <div className="trending-see-more">
            <button disabled={loading} onClick={() => setPage(page + 1)}>
              See More
            </button>
          </div>
        </>
      )}
      {error ? (
        <ErrorScreen
          customPath="/"
          customTitle="Failed to get trending movies."
          customMessage="Sorry! It looks live we're having issues getting trending movies. Please try refreshing the page or come back later."
        />
      ) : (
        <></>
      )}
    </div>
  );
}
