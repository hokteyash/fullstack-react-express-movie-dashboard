import "../css/TrailerUnavailable.css";

const TrailerUnavailable = () => {
  return (
    <div className="trailer-unavailable">
      <img
        src="https://media.giphy.com/media/j2mYtONcRPnLW/giphy.gif"
        alt="Trailer Not Available"
        className="trailer-unavailable-img"
      />
      <h2>Oops! Trailer Not Available</h2>
      <p>We couldn't find a trailer for this movie. Try another one!</p>
    </div>
  );
};

export default TrailerUnavailable;
