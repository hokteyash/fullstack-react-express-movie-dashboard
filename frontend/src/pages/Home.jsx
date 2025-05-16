import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import "../css/Favorites.css";
import { getPopularMovies, searchMovies } from "../services/api";
import { Vortex } from "react-loader-spinner";
import { FaMicrophone } from "react-icons/fa";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error.message);
        setError("Failed to Load movies....");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    window.addEventListener("homeClick", fetchMovies);
    return () => window.removeEventListener("homeClick", fetchMovies);
  }, []);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Web Speech API is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      // console.log(JSON.stringify(event.results));
      const transcript = event.results[0][0].transcript;
      // console.log(transcript);
      setSearchQuery(transcript); // ✅ only this is enough
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch(searchQuery);
      }else{
        const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error.message);
        setError("Failed to Load movies....");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
      }
    }, 500); // adds a 500ms delay (debounce)
  
    return () => clearTimeout(delayDebounce); // clean up
  }, [searchQuery]);
  

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    await performSearch(searchQuery);
  };

  const performSearch = async (query) => {
    const trimmed = query.trim();
    if (trimmed.length === 0) return;
    setLoading(true);
    try {
      const searchedMovies = await searchMovies(trimmed);
      setMovies(searchedMovies);
    } catch (error) {
      console.log(error.message);
      setError("Failed to search movie....");
    } finally {
      setLoading(false);
      // setSearchQuery("");
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button type="submit" className="search-button">
          Search
        </button> */}
        <button type="button" onClick={toggleListening} className="mic-button">
          <FaMicrophone size={18} />
          {isListening ? "Listening..." : "Start Voice Search"}
          {isListening && <span className="mic-indicator"></span>}
        </button>
      </form>

      {!loading ? (
        <div className="movies-grid">
          {movies.length === 0 ? (
            <div className="favorites-empty">
              <h2>No Movies Found :(</h2>
              <p>
                Start searching for another movie and they will appear here.
              </p>
            </div>
          ) : (
            movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                onClick={() => console.log(JSON.stringify(movie))}
              />
            ))
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Home;
