import { createContext, ReactNode, useContext } from "react";
import { useGetTrending } from "../helpers/hooks";
import { TrendingMovie } from "../helpers/Types";

interface HomeProviderProps {
  children: ReactNode;
}

interface HomeContextProps {
  data: TrendingMovie[] | null;
  loading: boolean;
  error: boolean;
}

const HomeContext = createContext<HomeContextProps>({
  data: null,
  loading: true,
  error: false,
});

export default function HomeProvider({ children }: HomeProviderProps) {
  const { data, loading, error } = useGetTrending({ type: "movie" });

  return (
    <HomeContext.Provider value={{ data, loading, error }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeProviderContext = () => {
  return useContext(HomeContext);
};
