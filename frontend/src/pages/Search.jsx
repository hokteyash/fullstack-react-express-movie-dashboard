import { useEffect, useRef, useState } from "react";
import { getMovieTrailer, getPopularMovies } from "../services/api";
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
  const [trailerKey, setTrailerKey] = useState(null); // newly added
  const scrollRef = useRef();

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleClickOnMovie = async (movie) => {
    // console.log(movie);
    setBannerMovie(movie);
    const key = await getMovieTrailer(movie.id); // newly added
    setTrailerKey(key); // newly added
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        const key = await getMovieTrailer(popularMovies[0]?.id);
        setTrailerKey(key);
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
      <MovieDetailCard movie={bannerMovie} key={Math.random()} />
      {trailerKey && (
        <div className="trailer-container">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

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
