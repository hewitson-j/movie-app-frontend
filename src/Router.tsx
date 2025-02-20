import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrendingPage from "./pages/TrendingPage";
import SearchPage from "./pages/SearchPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}
