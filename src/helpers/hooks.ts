import { useEffect, useState } from "react";
import { getTrending, searchMovieByTitle } from "./helperFunctions";

interface useGetTrendingParams {
  type?: "movie" | "tv";
}

export function useGetTrending({ type = "movie" }: useGetTrendingParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTrending({ type })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [type]);

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
