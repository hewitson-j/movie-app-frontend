import { createContext, ReactNode, useContext } from "react";
import { useGetTrending } from "../helpers/hooks";
import { TrendingMovie } from "../helpers/Types";
import { useGlobalProviderContext } from "./GlobalProvider";

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
  const { backendUrl } = useGlobalProviderContext();
  const { data, loading, error } = useGetTrending({
    type: "movie",
    baseUrl: backendUrl,
  });

  return (
    <HomeContext.Provider value={{ data, loading, error }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeProviderContext = () => {
  return useContext(HomeContext);
};
