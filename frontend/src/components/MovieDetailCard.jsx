import { useState } from "react";
import "../css/MovieDetailCard.css";
import { Vortex } from "react-loader-spinner";
import "../css/Home.css";

const MovieDetailCard = ({ movie }) => {
  // console.log(movie);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!movie) return null;

  return (
    <div className="movie-detail-card">
      {!isLoaded && (
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
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="movie-background"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="overlay">
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="genres">
            {movie.genre_ids?.map((id) => (
              <span key={id} className="genre-badge">
                Genre {id}
              </span>
            ))}
          </div>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {movie?.rating}
          </p>
          <p>
            <strong>Director:</strong> Christopher Nolan
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
