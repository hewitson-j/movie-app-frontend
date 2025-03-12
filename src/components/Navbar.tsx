import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useGlobalProviderContext } from "../context/GlobalProvider";

export default function Navbar() {
  const navigate = useNavigate();
  const { isUsingNewBackend, setIsUsingNewBackend } =
    useGlobalProviderContext();

  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/trending")}>Trending</li>
        <li onClick={() => navigate("/search")}>Search</li>
        <li onClick={() => setIsUsingNewBackend(!isUsingNewBackend)}>{`${
          isUsingNewBackend ? "Disable" : "Enable"
        } New API`}</li>
      </ul>
    </nav>
  );
}
