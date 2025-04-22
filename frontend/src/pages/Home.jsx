// import { useEffect, useState } from "react";
// import MovieCard from "../components/MovieCard";
// import "../css/Home.css";
// import "../css/Favorites.css";
// import { getPopularMovies, searchMovies } from "../services/api";
// import { Vortex } from "react-loader-spinner";

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const popularMovies = await getPopularMovies();
//         setMovies(popularMovies);
//       } catch (error) {
//         console.log(error.message);
//         setError("Failed to Load movies....");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//     window.addEventListener("homeClick", fetchMovies); // added Event Listener
//     return () => window.removeEventListener("homeClick", fetchMovies);
//   }, []);

//   const handleSubmit = (obj) => {};

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const trimmedMovie = searchQuery.trim();
//       if (trimmedMovie.length == 0) return;
//       const searchedMovies = await searchMovies(trimmedMovie);
//       setMovies(searchedMovies);
//     } catch (error) {
//       console.log(error.message);
//       setError("Failed to search movie....");
//     } finally {
//       setLoading(false);
//     }
//     setSearchQuery("");
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="home">
//       <form onSubmit={handleSubmit} className="search-form">
//         <input
//           type="text"
//           placeholder="Search for a movies..."
//           className="search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button type="submit" className="search-button" onClick={handleSearch}>
//           Search
//         </button>
//       </form>
//       {!loading ? (
//         <div className="movies-grid">
//           {movies.length == 0 ? (
//             <div className="favorites-empty">
//               <h2>No Movies Found :(</h2>
//               <p>Starting search another movie and they will appear here</p>
//             </div>
//           ) : (
//             movies.map((movie) => (
//               <MovieCard
//                 movie={movie}
//                 key={movie.id}
//                 onClick={() => console.log(JSON.stringify(movie))}
//               />
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="loading">
//           <Vortex
//             visible={true}
//             height="100"
//             width="100"
//             ariaLabel="vortex-loading"
//             wrapperStyle={{}}
//             wrapperClass="vortex-wrapper"
//             colors={["red", "green", "blue", "yellow", "orange", "purple"]}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// New code:
// --------------------------

// import { useEffect, useRef, useState } from "react";
// import MovieCard from "../components/MovieCard";
// import "../css/Home.css";
// import "../css/Favorites.css";
// import { getPopularMovies, searchMovies } from "../services/api";
// import { Vortex } from "react-loader-spinner";
// import { FaMicrophone } from "react-icons/fa"; // <-- Mic Icon

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const recognitionRef = useRef(null); // <-- Speech Recognition Ref

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const popularMovies = await getPopularMovies();
//         setMovies(popularMovies);
//       } catch (error) {
//         console.log(error.message);
//         setError("Failed to Load movies....");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//     window.addEventListener("homeClick", fetchMovies);
//     return () => window.removeEventListener("homeClick", fetchMovies);
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const trimmedMovie = searchQuery.trim();
//       if (trimmedMovie.length === 0) return;
//       const searchedMovies = await searchMovies(trimmedMovie);
//       setMovies(searchedMovies);
//     } catch (error) {
//       console.log(error.message);
//       setError("Failed to search movie....");
//     } finally {
//       setLoading(false);
//     }
//     setSearchQuery("");
//   };

//   const startVoiceSearch = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech Recognition not supported 😥");
//       return;
//     }

//     if (!recognitionRef.current) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = false;
//       recognition.maxAlternatives = 1;

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setSearchQuery(transcript);
//         document.querySelector(".search-button").click(); // trigger search
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//       };

//       recognitionRef.current = recognition;
//     }

//     recognitionRef.current.start();
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="home">
//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           placeholder="Search for a movies..."
//           className="search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button type="submit" className="search-button">
//           Search
//         </button>
//         <button type="button" className="mic-button" onClick={startVoiceSearch}>
//           <FaMicrophone />
//         </button>
//       </form>

//       {!loading ? (
//         <div className="movies-grid">
//           {movies.length === 0 ? (
//             <div className="favorites-empty">
//               <h2>No Movies Found :(</h2>
//               <p>Start searching another movie and they will appear here</p>
//             </div>
//           ) : (
//             movies.map((movie) => (
//               <MovieCard
//                 movie={movie}
//                 key={movie.id}
//                 onClick={() => console.log(JSON.stringify(movie))}
//               />
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="loading">
//           <Vortex
//             visible={true}
//             height="100"
//             width="100"
//             ariaLabel="vortex-loading"
//             colors={["red", "green", "blue", "yellow", "orange", "purple"]}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

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
      const transcript = event.results[0][0].transcript;
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

  // const handleVoiceSearch = async (query) => {
  //   await performSearch(query);
  // };

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
