import axios from "axios";

interface getTrendingProps {
  type?: "movie" | "tv";
}

export async function getTrending({ type = "movie" }: getTrendingProps) {
  return await axios.get(
    `https://movie-app-api-af87945d8ca3.herokuapp.com/movies/trending/${type}?timeframe=day`
  );
}
