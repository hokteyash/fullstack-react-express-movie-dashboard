import MovieCard from "../components/MovieCard";

const Home = () => {
  const movies = [
    {
      id: 1,
      title: "John Wick",
      release_date: "2020",
    },
    {
      id: 2,
      title: "John Wick",
      release_date: "2020",
    },
    {
      id: 3,
      title: "John Wick",
      release_date: "2020",
    },
  ];
  const handleSubmit = (obj) => {

  }
  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
