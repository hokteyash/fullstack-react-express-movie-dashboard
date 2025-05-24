const API_KEY = "ea342b123712f3b2339952c259ae62b7";
const OMDB_API_KEY = "91f93dc6";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieTrailer = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();
  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  console.log(trailer);
  return trailer ? trailer.key : null;
};

export const getMovieRating = async (title) => {
  const response = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(
      title
    )}&apikey=${OMDB_API_KEY}`
  );
  const data = await response.json();
  if (data.Response === "True") {
    return {
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
    };
  } else {
    console.error("Rating not found:", data.Error);
    return {
      imdbRating: "N/A",
      imdbVotes: "0",
    };
  }
};

// backend api's
export const signupApi = async ({ name, email, password }) => {
  const response = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  return data;
};

export const signinApi = async ({ email, password }) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const updateFavoritesApi = async (favorites, email) => {
  const response = await fetch("http://localhost:5000/api/favorites", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // ✅ this must be present
    },
    body: JSON.stringify({ favorites, email }),
  });
  return response.json();
};

export const fetchFavoritesApi = async (email) => {
  const response = await fetch("http://localhost:5000/api/favorites", {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
};
