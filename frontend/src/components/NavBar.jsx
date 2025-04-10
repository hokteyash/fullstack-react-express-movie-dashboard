import { Link } from "react-router-dom"
import "../css/Navbar.css"

const NavBar = () => {
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to='/'>Movie App</Link>
            </div>
            <div>
                {/* Dispatch Event Listener -> window.dispatchEvent */}
                <Link to='/' className="nav-link" onClick={() => window.dispatchEvent(new Event("homeClick"))}>Home</Link> 
                <Link to='/favorites' className="nav-link">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar;