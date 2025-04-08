import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";
import "../css/Favorites.css";

const Favorites = () => {
  const { favorites } = useMovieContext();
  return (
    <div className="movies-grid">
      {favorites.length == 0 ? (
        <div className="favorites-empty">
          <h2>No Movies Found :(</h2>
          <p>Starting adding your favorite items and they will appear here</p>
        </div>
      ) : (
        favorites.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      )}
    </div>
  );
};
export default Favorites;
