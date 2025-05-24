import { createContext, useContext, useEffect, useState } from "react";
import { updateFavoritesApi } from "../services/api";
import { showToast } from "../utils/validation";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites"))
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const savedFavorites = async () => {
        try {
          const response = await updateFavoritesApi(favorites, user?.email);
          if (response?.status_code === 200) {
            showToast("Saved to your Favorites!", "success");
          } else {
            showToast(response?.message, "error");
          }
        } catch (error) {
          console.log(error);
          showToast("Try again later!", "error");
        }
      };
      if (user) {
        localStorage.setItem("favorites", JSON.stringify(favorites)); // added new code
        savedFavorites();
      }
    }, 1000);

    return () => clearTimeout(delayDebounce); // clean up
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setFavorites(user.favorites);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    login,
    logout,
    user,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
