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
}
export function useSearchMovie({ title }: useSearchMovieParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (title.trim() !== "") {
      setLoading(true);
      searchMovieByTitle({ title: title })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [title]);

  return { data, loading, error };
}
