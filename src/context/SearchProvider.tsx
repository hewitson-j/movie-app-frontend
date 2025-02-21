import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SearchMovie } from "../helpers/Types";
import { useSearchMovie } from "../helpers/hooks";

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextProps {
  data: SearchMovie[] | null;
  loading: boolean;
  error: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>> | (() => void);
}

const SearchContext = createContext<SearchContextProps>({
  data: [],
  loading: true,
  error: false,
  setSearchTerm: () => null,
});

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error } = useSearchMovie({ title: searchTerm });

  return (
    <SearchContext.Provider value={{ data, loading, error, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchProviderContext = () => {
  return useContext(SearchContext);
};
