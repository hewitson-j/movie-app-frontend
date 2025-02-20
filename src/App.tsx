import { HashRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Router />
      </main>
    </HashRouter>
  );
}

export default App;
