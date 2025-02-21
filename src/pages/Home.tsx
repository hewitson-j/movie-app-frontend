import MoviePoster from "../components/MoviePoster";
import Title from "../components/Title";
import HomeProvider, { useHomeProviderContext } from "../context/HomeProvider";
import "./Home.css";

export default function Home() {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
}

function HomePage() {
  const { loading, error } = useHomeProviderContext();

  return (
    <div className="home-page page">
      <Title>Welcome!</Title>
      <p>We're so excited to have you here. Feel free to check the website!</p>
      {loading ? <>Loading...</> : <HomePageTrendingMovies />}
      {error ? <>Error loading trending movies.</> : <></>}
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
            posterPath={entry.poster_path}
            title={entry.title}
            overview={entry.overview}
          />
        );
      })}
    </div>
  );
}
