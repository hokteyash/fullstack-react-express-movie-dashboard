import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import Search from "./pages/Search";

function App() {
  return (
    <MovieProvider>
      <NavBar/>
      <main className="main-content">
      <Routes>
        <Route path="/search" element={<Home />} />
        <Route path="/" element={<Search/>}/>
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </main>
    </MovieProvider>
  );
}

export default App;
