import { useEffect, useState } from "react";
import { getTrending, searchMovieByTitle } from "./helperFunctions";

interface useGetTrendingParams {
  type?: "movie" | "tv";
  page?: number;
}

export function useGetTrending({
  type = "movie",
  page = 1,
}: useGetTrendingParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrending({ type, page })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [page, type]);

  return { data, loading, error };
}

interface useSearchMovieParams {
  title: string;
  type: "movie" | "tv";
}
export function useSearchMovie({ title, type }: useSearchMovieParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (title.trim() !== "") {
      setLoading(true);
      searchMovieByTitle({ title, type })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [title, type]);

  return { data, loading, error };
}
