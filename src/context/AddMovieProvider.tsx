import { createContext, ReactNode, useContext } from "react";

interface AddMovieProviderProps {
  children: ReactNode;
}

const AddMovieContext = createContext({});

export default function AddProvider({ children }: AddMovieProviderProps) {
  return (
    <AddMovieContext.Provider value={{}}>{children}</AddMovieContext.Provider>
  );
}

export function useAddMovieContext() {
  return useContext(AddMovieContext);
}
