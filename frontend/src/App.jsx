import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useMovieContext } from "./context/MovieContext";
import Search from "./pages/Search";
import SignInSignUp from "./pages/SignInSignUp";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import Profile from "./pages/Profile";

function App() {
  const { user } = useMovieContext();
  const location = useLocation();
  useEffect(() => {
    const body = document.body;
    const root = document.getElementById("root");
    if (!user) {
      // Login-signup mode
      body.style.cssText = `
      font-family: 'Segoe UI', sans-serif;
      background: #f6f5f7;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      `;
      root.style.cssText = "";
    } else {
      // Main App Mode
      body.removeAttribute("style");
      root.style.cssText = `
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      `;
    }
  }, [user, location]);
  return (
    <>
      {!user ? (
        <SignInSignUp />
      ) : (
        <>
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/search" element={<Home />} />
              <Route path="/" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
