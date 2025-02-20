import { createContext, ReactNode, useContext } from "react";
import { useGetTrending } from "../helpers/hooks";

interface HomeProviderProps {
  children: ReactNode;
}

interface HomeContextProps<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

const HomeContext = createContext<HomeContextProps<unknown>>({
  data: null,
  loading: true,
  error: false,
});

export default function HomeProvider({ children }: HomeProviderProps) {
  const { data, loading, error } = useGetTrending();

  return (
    <HomeContext.Provider value={{ data, loading, error }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeProviderContext() {
  return useContext(HomeContext);
}
