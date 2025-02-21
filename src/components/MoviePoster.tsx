import { useNavigate } from "react-router-dom";
import "./MoviePoster.css";

interface MoviePosterProps {
  id: number;
  posterPath: string;
  title: string;
  overview: string;
  type: "movie" | "tv";
}

export default function MoviePoster({
  id,
  posterPath,
  title,
  overview,
  type,
}: MoviePosterProps) {
  const navigate = useNavigate();

  return (
    <div
      className="movie-poster"
      onClick={() => navigate(`/${type}/details/${id}`)}
    >
      <img src={`https://image.tmdb.org/t/p/w200/${posterPath}`} />
      <h2>{title}</h2>
      <p>{overview}</p>
    </div>
  );
}
