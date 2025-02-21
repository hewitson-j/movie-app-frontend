import { useNavigate } from "react-router-dom";
import "./MoviePoster.css";

interface MoviePosterProps {
  id: number;
  posterPath: string;
  title: string;
  overview: string;
}

export default function MoviePoster({
  id,
  posterPath,
  title,
  overview,
}: MoviePosterProps) {
  const navigate = useNavigate();

  return (
    <div className="movie-poster" onClick={() => navigate(`/movies/${id}`)}>
      <img src={`https://image.tmdb.org/t/p/w200/${posterPath}`} />
      <h2>{title}</h2>
      <p>{overview}</p>
    </div>
  );
}
