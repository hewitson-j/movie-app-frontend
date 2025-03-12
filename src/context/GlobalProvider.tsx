import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GlobalProviderProps {
  children: ReactNode;
}

interface GlobalContextProps {
  backendUrl: string;
  isUsingNewBackend: boolean;
  setIsUsingNewBackend: Dispatch<SetStateAction<boolean>> | (() => null);
}

const GlobalContext = createContext<GlobalContextProps>({
  backendUrl: "",
  setIsUsingNewBackend: () => null,
  isUsingNewBackend: false,
});

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const oldBackendUrl =
    "https://movie-app-api-af87945d8ca3.herokuapp.com/movies";
  const newBackendUrl =
    "https://movie-springboot-api-d9f8cdb8f208.herokuapp.com/movies";

  const [isUsingNewBackend, setIsUsingNewBackend] = useState(false);

  const backendUrl = isUsingNewBackend ? newBackendUrl : oldBackendUrl;

  return (
    <GlobalContext.Provider
      value={{ isUsingNewBackend, setIsUsingNewBackend, backendUrl }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalProviderContext() {
  return useContext(GlobalContext);
}
