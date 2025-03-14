import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../helpers/helperFunctions";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import { Movie, Show } from "../helpers/Types";
import "./MovieDetails.css";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { useGlobalProviderContext } from "../context/GlobalProvider";

export default function MovieDetails() {
  const { type, id } = useParams();
  const { backendUrl } = useGlobalProviderContext();

  const [movieData, setMovieData] = useState<Movie | Show>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || !type || (type !== "movie" && type !== "tv")) {
      setError(true);
      return;
    }

    getById({ id, type, baseUrl: backendUrl })
      .then((res) => {
        setMovieData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [backendUrl, id, type]);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div
          className="movie-details"
          style={{
            backgroundImage: movieData?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`
              : `url(Default.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="movie-details-text">
            <div>
              <Title size="h1">{movieData?.title || movieData?.name}</Title>
              {movieData?.adult && (
                <h2>
                  <b>WARNING - THIS MOVIE IS RATED FOR ADULTS ONLY</b>
                </h2>
              )}
              <h2>{movieData?.tagline}</h2>
            </div>
            <img
              src={
                movieData?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movieData?.poster_path}`
                  : "Default.jpg"
              }
              alt={movieData?.title}
            />
            <div>
              <p>{movieData?.overview}</p>
              <div className="movie-extra-details">
                <div className="movie-details-rating">
                  <h3>Rating:</h3>
                  <p>{Math.floor(movieData?.vote_average || 0) * 10 + "%"}</p>
                </div>
              </div>
              <div className="movie-details-buttons">
                <button onClick={() => navigate(-1)}>Go Back</button>
                {movieData?.homepage && (
                  <button
                    onClick={() => {
                      window.open(
                        movieData.homepage,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    Click Here to go to Website
                  </button>
                )}
              </div>
            </div>
          </div>
          {error ? (
            <ErrorScreen
              customTitle={`Error loading ${
                type === "movie" ? "Movie" : "TV Show"
              }`}
              customMessage="We're sorry! It looks like the material you're looking for is unavailable or there was an error displaying the information. Click the button below to go back."
              showButton
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
