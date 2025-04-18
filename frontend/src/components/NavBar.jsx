import { Link } from "react-router-dom"
import "../css/Navbar.css"

const NavBar = () => {
    const dispatchHomeClick = () => {
        window.dispatchEvent(new Event("homeClick"));
    }
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to='/' onClick={dispatchHomeClick}>Movie App</Link>
            </div>
            <div>
                {/* Dispatch Event Listener -> window.dispatchEvent */}
                <Link to='/' className="nav-link" onClick={dispatchHomeClick}>Home</Link>
                <Link to='/search' className="nav-link">Search</Link>
                <Link to='/favorites' className="nav-link">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar;