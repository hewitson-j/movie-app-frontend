import { useEffect, useState } from "react";
import { getTrending, searchByTitle } from "./helperFunctions";

interface useGetTrendingParams {
  type?: "movie" | "tv";
  page?: number;
  baseUrl: string;
}

export function useGetTrending({
  type = "movie",
  page = 1,
  baseUrl,
}: useGetTrendingParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrending({ type, page, baseUrl })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [baseUrl, page, type]);

  return { data, loading, error };
}

interface useSearchByTitleParams {
  title: string;
  type: "movie" | "tv";
  page: number;
  baseUrl: string;
}
export function useSearchByTitle({
  title,
  type,
  page,
  baseUrl,
}: useSearchByTitleParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [totalResults, setTotalResults] = useState<number>();

  useEffect(() => {
    if (title.trim() !== "") {
      setLoading(true);
      searchByTitle({ title, type, page, baseUrl })
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
  }, [baseUrl, page, title, type]);

  return { data, loading, error, totalResults };
}
