import { useParams } from "react-router-dom";
import { getMovieById } from "../helpers/helperFunctions";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import { Movie } from "../helpers/Types";
import "./MovieDetails.css";

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

  return (
    <div className="movie-details">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <Title size="h2">{movieData?.title}</Title>
          <img
            src={`https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`}
            alt={movieData?.title}
          />
          <h2>{movieData?.tagline}</h2>
          <p>{movieData?.overview}</p>
          <div>
            <div className="movie-details-rating">
              <h3>Rating:</h3>
            </div>
          </div>
        </>
      )}
      {error ? <>Error!</> : <></>}
    </div>
  );
}
