import { useEffect, useState } from "react";
import { getTrending } from "./helperFunctions";

interface useGetTrendingProps {
  type?: "movie" | "tv";
}

export function useGetTrending({ type = "movie" }: useGetTrendingProps) {
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
  }, []);

  return { data, loading, error };
}
