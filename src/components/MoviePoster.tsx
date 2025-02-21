import "./MoviePoster.css";

interface MoviePosterProps {
  posterPath: string;
  title: string;
  overview: string;
}

export default function MoviePoster({
  posterPath,
  title,
  overview,
}: MoviePosterProps) {
  return (
    <div className="movie-poster">
      <img src={`https://image.tmdb.org/t/p/w200/${posterPath}`} />
      <h2>{title}</h2>
      <p>{overview}</p>
    </div>
  );
}
