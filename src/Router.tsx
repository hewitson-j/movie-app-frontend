import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:type/details/:id" element={<MovieDetails />} />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route path="/error" element={<ErrorScreen />} />
      <Route
        path="/not-found"
        element={
          <ErrorScreen
            customPath="/"
            customTitle="Page Not Found"
            customMessage="Whoops! Looks like you've come to a non-existent page. Please go back home and try again."
          />
        }
      />
      <Route path="*" element={<Navigate to={"/not-found"} />} />
    </Routes>
  );
}
