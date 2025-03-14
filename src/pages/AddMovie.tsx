import Title from "../components/Title";
import AddMovieProvider from "../context/AddMovieProvider";
import "./AddMovie.css";

export default function AddMovie() {
  return (
    <AddMovieProvider>
      <AddMoviePage />
    </AddMovieProvider>
  );
}

function AddMoviePage() {
  return (
    <div className="add-movie page">
      <Title size="h1">Add a Movie/TV Show</Title>
      <p>
        If you'd like to add a movie or TV show feel free to add it here! Use
        the form below.
      </p>
      <form>
        <div>
          <label htmlFor="movie-id-input">Movie ID (From TMDb)</label>
          <input id="movie-id-input" type="text" required />
        </div>
        <div>
          <label htmlFor="movie-title-input">Title</label>
          <input id="movie-title-input" type="text" required />
        </div>
        <div>
          <label htmlFor="movie-overview-input">Overview</label>
          <input id="movie-overview-input" type="text" />
        </div>
        <div>
          <label htmlFor="movie-homepage-input">Website URL</label>
          <input id="movie-homepage-input" type="text" />
        </div>
        <div>
          <label htmlFor="movie-poster-input">Poster URL</label>
          <input id="movie-poster-input" type="text" />
        </div>
        <div>
          <label htmlFor="movie-backdrop-input">Backdrop URL</label>
          <input id="movie-backdrop-input" type="text" />
        </div>
        <h2>Type:</h2>
        <div className="form-button-toggle">
          <button>Movie</button>
          <button>TV Show</button>
        </div>
      </form>
    </div>
  );
}
