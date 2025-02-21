import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TrendingMovie } from "../helpers/Types";
import { useGetTrending } from "../helpers/hooks";

interface TrendingProviderProps {
  children: ReactNode;
}

interface TrendingContextProps {
  trendingMovies: TrendingMovie[] | null;
  loading: boolean;
  error: boolean;
}

interface TrendingStateContextProps {
  page: number;
  type: "movie" | "tv";
  setPage: Dispatch<SetStateAction<number>> | (() => void);
  setType: Dispatch<SetStateAction<"movie" | "tv">> | (() => void);
}

const TrendingContext = createContext<TrendingContextProps>({
  trendingMovies: null,
  loading: true,
  error: false,
});

const TrendingStateContext = createContext<TrendingStateContextProps>({
  page: 1,
  type: "movie",
  setPage: () => null,
  setType: () => null,
});

export default function TrendingProvider({ children }: TrendingProviderProps) {
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState<"movie" | "tv">("movie");

  const { data, loading, error } = useGetTrending({ type, page });

  useEffect(() => {
    if (data && data.length > 0) {
      setTrendingMovies((prevMovies) => [...prevMovies, ...data]);
    }
  }, [data]);

  useEffect(() => {
    setTrendingMovies([]);
    setPage(1);
  }, [type]);

  return (
    <TrendingStateContext.Provider value={{ page, setPage, type, setType }}>
      <TrendingContext.Provider value={{ trendingMovies, loading, error }}>
        {children}
      </TrendingContext.Provider>
    </TrendingStateContext.Provider>
  );
}

export const useTrendingStateContext = () => {
  return useContext(TrendingStateContext);
};

export const useTrendingContext = () => {
  return useContext(TrendingContext);
};
