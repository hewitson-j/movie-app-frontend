import { useParams } from "react-router-dom";
import { getMovieById } from "../helpers/helperFunctions";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();

  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    getMovieById({ id: id })
      .then((res) => {
        setMovieData(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="movie-details">
      {loading ? <>Loading...</> : JSON.stringify(movieData)}
      {error ? <>Error!</> : <></>}
    </div>
  );
}
