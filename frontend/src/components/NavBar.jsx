import { Link } from "react-router-dom";
import "../css/Navbar.css";

const NavBar = () => {
  const dispatchHomeClick = () => {
    window.dispatchEvent(new Event("homeClick"));
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={dispatchHomeClick}>
          Movie App
        </Link>
      </div>
      <div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {/* Dispatch Event Listener -> window.dispatchEvent */}
        <Link to="/search" className="nav-link" onClick={dispatchHomeClick}>
          Search
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
