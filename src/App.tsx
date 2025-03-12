import { HashRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";
import GlobalProvider from "./context/GlobalProvider";

function App() {
  return (
    <HashRouter>
      <GlobalProvider>
        <Navbar />
        <main>
          <Router />
        </main>
        <Copyright />
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
