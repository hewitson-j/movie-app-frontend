import axios from "axios";

export async function getTrending() {
  return await axios.get(
    "https://movie-app-api-af87945d8ca3.herokuapp.com/movies/trending/movie?timeframe=day"
  );
}
