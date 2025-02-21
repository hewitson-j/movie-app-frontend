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
  setType: Dispatch<SetStateAction<"movie" | "tv">> | (() => void);
  type: "movie" | "tv";
}

const SearchContext = createContext<SearchContextProps>({
  data: [],
  loading: true,
  error: false,
  type: "movie",
  setSearchTerm: () => null,
  setType: () => null,
});

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");

  const { data, loading, error } = useSearchMovie({
    title: searchTerm,
    type: type,
  });

  return (
    <SearchContext.Provider
      value={{ data, loading, error, setSearchTerm, type, setType }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchProviderContext = () => {
  return useContext(SearchContext);
};
