import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/trending")}>Trending</li>
        <li onClick={() => navigate("/search")}>Search</li>
      </ul>
    </nav>
  );
}
