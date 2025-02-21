import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import LoadingScreen from "./components/LoadingScreen";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/loading" element={<LoadingScreen />} />
    </Routes>
  );
}
