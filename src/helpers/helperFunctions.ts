import axios from "axios";

interface GetTrendingParams {
  type?: "movie" | "tv";
  page?: number;
  baseUrl: string;
}

export function getTrending({
  type = "movie",
  page = 1,
  baseUrl,
}: GetTrendingParams) {
  return axios.get(`${baseUrl}/trending/${type}?timeframe=day&page=${page}`);
}

interface GetByIdParams {
  id: string;
  type: "movie" | "tv";
  baseUrl: string;
}

export function getById({ id, type, baseUrl }: GetByIdParams) {
  return axios.get(`${baseUrl}/search/${type}/${id}`);
}

interface SearchByTitleParams {
  title: string;
  type: "movie" | "tv";
  page: number;
  baseUrl: string;
}

export function searchByTitle({
  title,
  type = "movie",
  page = 1,
  baseUrl,
}: SearchByTitleParams) {
  title = encodeURI(title);
  return axios.get(`${baseUrl}/search/${type}?title=${title}&page=${page}`);
}
