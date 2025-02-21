import axios from "axios";

const BASE_URL = "https://movie-app-api-af87945d8ca3.herokuapp.com/movies";

interface GetTrendingParams {
  type?: "movie" | "tv";
  page?: number;
}

export function getTrending({ type = "movie", page = 1 }: GetTrendingParams) {
  return axios.get(`${BASE_URL}/trending/${type}?timeframe=day&page=${page}`);
}

interface GetByIdParams {
  id: string;
  type: "movie" | "tv";
}

export function getById({ id, type }: GetByIdParams) {
  return axios.get(`${BASE_URL}/search/${type}/${id}`);
}

interface SearchMovieByTitleParams {
  title: string;
  type: "movie" | "tv";
}

export function searchMovieByTitle({
  title,
  type = "movie",
}: SearchMovieByTitleParams) {
  title = encodeURI(title);
  return axios.get(`${BASE_URL}/search/${type}?title=${title}`);
}
