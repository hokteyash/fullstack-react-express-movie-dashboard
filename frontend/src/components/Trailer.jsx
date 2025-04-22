import "../css/Trailer.css";

const Trailer = ({ trailerKey }) => {
  return (
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
  );
};

export default Trailer;
