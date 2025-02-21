import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { SearchMovie } from "../helpers/Types";
import { useSearchByTitle } from "../helpers/hooks";

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
  setSafePage: (arg0: number) => void;
  totalResults: number;
  page: number;
}

const SearchContext = createContext<SearchContextProps>({
  data: [],
  loading: true,
  error: false,
  type: "movie",
  setSearchTerm: () => null,
  setType: () => null,
  setSafePage: () => null,
  totalResults: 0,
  page: 0,
});

export default function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");

  const [page, setPage] = useState(1);

  const { data, loading, error, totalResults } = useSearchByTitle({
    title: searchTerm,
    type: type,
    page: page,
  });

  const setSafePage = (newPage: number) => {
    const maxPage = totalResults ? Math.ceil(totalResults / 20) : 1;
    const safePage = Math.min(Math.max(newPage, 1), maxPage);
    setPage(safePage);
  };

  return (
    <SearchContext.Provider
      value={{
        data,
        loading,
        error,
        setSearchTerm,
        type,
        setType,
        setSafePage,
        totalResults: totalResults || 0,
        page,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchProviderContext = () => {
  return useContext(SearchContext);
};
