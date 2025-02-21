import { HashRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Router />
      </main>
      <Copyright />
    </HashRouter>
  );
}

export default App;
