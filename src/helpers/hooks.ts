import { useEffect, useState } from "react";
import { getTrending, searchByTitle } from "./helperFunctions";

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

interface useSearchByTitleParams {
  title: string;
  type: "movie" | "tv";
  page: number;
}
export function useSearchByTitle({
  title,
  type,
  page,
}: useSearchByTitleParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [totalResults, setTotalResults] = useState<number>();

  useEffect(() => {
    if (title.trim() !== "") {
      setLoading(true);
      searchByTitle({ title, type, page })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
          setTotalResults(res.data.total_results);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [page, title, type]);

  return { data, loading, error, totalResults };
}
