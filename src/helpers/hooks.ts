import { useEffect, useState } from "react";
import { getTrending } from "./helperFunctions";

export function useGetTrending() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTrending()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return { data, loading, error };
}
