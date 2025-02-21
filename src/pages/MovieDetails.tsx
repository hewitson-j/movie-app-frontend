import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../helpers/helperFunctions";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import { Movie } from "../helpers/Types";
import "./MovieDetails.css";
import LoadingScreen from "../components/LoadingScreen";

export default function MovieDetails() {
  const { id } = useParams();

  const [movieData, setMovieData] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    getMovieById({ id: id })
      .then((res) => {
        setMovieData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const navigate = useNavigate();

  return (
    <div className="movie-details">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Title size="h1">{movieData?.title}</Title>
          <img
            src={`https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`}
            alt={movieData?.title}
          />
          <h2>{movieData?.tagline}</h2>
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
        </>
      )}
      {error ? <>Error!</> : <></>}
    </div>
  );
}
