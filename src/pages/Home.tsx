import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import MoviePoster from "../components/MoviePoster";
import Title from "../components/Title";
import HomeProvider, { useHomeProviderContext } from "../context/HomeProvider";
import "./Home.css";
import ErrorScreen from "../components/ErrorScreen";

export default function Home() {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
}

function HomePage() {
  const { loading, error } = useHomeProviderContext();
  const navigate = useNavigate();

  return (
    <div className="home-page page">
      <div className="home-page-title">
        <Title>Welcome!</Title>
        <p>
          We're excited to have you here. Movies are an integral part of art,
          society, and culture, and here we hope this app is helpful in
          informing about the different works of art produced by the film
          industry. Feel free to check what's trending, or if you have a title
          in particular you're looking for you can search.
        </p>
      </div>
      {loading ? <LoadingScreen /> : <HomePageTrendingMovies />}
      {error ? (
        <ErrorScreen
          showButton={false}
          customTitle="Failed to get trending movies."
          customMessage="Sorry! It looks live we're having issues getting trending movies. Feel free though to go to the trending page to see more options."
        />
      ) : (
        <></>
      )}
      <button onClick={() => navigate("/trending")}>
        See what else is Trending
      </button>
    </div>
  );
}

function HomePageTrendingMovies() {
  const { data } = useHomeProviderContext();

  return (
    <div className="home-page-trending-movies-body">
      {data?.slice(0, 6).map((entry) => {
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
  );
}
