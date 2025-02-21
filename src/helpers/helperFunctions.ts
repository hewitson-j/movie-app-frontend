import axios from "axios";

const BASE_URL = "https://movie-app-api-af87945d8ca3.herokuapp.com/movies";

interface GetTrendingParams {
  type?: "movie" | "tv";
}

export function getTrending({ type = "movie" }: GetTrendingParams) {
  return axios.get(`${BASE_URL}/trending/${type}?timeframe=day`);
}

interface GetMovieByIdParams {
  id: string;
}

export function getMovieById({ id }: GetMovieByIdParams) {
  return axios.get(`${BASE_URL}/search/${id}`);
}

interface SearchMovieByTitleParams {
  title: string;
}

export function searchMovieByTitle({ title }: SearchMovieByTitleParams) {
  title = encodeURI(title);
  return axios.get(`${BASE_URL}/search?title=${title}`);
}
