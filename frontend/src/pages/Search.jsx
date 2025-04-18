import { useEffect, useRef, useState } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import "../css/Favorites.css";
import "../css/HorizontalScroll.css"; // <-- make sure to include this
import { Vortex } from "react-loader-spinner";
import MovieDetailCard from "../components/MovieDetailCard";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef();

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleClickOnMovie = (movie) => {
    console.log(movie);
    setBannerMovie(movie);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setBannerMovie(popularMovies[0]);
      } catch (error) {
        console.error(error.message);
        setError("Failed to Load movies....");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Vortex
          visible={true}
          height="100"
          width="100"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="search-container">
        {/* In the below MovieDetailCard Component "key" property is necessary because it uniquely identifies other cards */}
      <MovieDetailCard movie={bannerMovie} key={Math.random()}/> 
      <div className="horizontal-scroll-container">
        <button className="scroll-btn left" onClick={() => scroll(-300)}>
          &#8249;
        </button>

        <div className="horizontal-scroll" ref={scrollRef}>
          {movies.length === 0 ? (
            <div className="favorites-empty">
              <h2>No Movies Found :(</h2>
              <p>Start searching for another movie and they will appear here</p>
            </div>
          ) : (
            movies.map((movie) => (
              <MovieCard
                isHome={true}
                movie={movie}
                key={movie.id}
                onClick={handleClickOnMovie}
              />
            ))
          )}
        </div>

        <button className="scroll-btn right" onClick={() => scroll(300)}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Search;
