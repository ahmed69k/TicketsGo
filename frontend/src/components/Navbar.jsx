import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import '../styling/Navbar.css';
import axios from 'axios'

const Navbar = () => {
  const {user,logout} = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className='back2home' to='/'>
          <h1 className="name">TicketsGo 🎟️</h1>
        </Link>
        <ul className="nav-links">
          {user ? (
            <>
              <li><Link to="/profile" className="nav-link">Profile</Link></li>
              <li><button className="button-nav-link" onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register" className="nav-link">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
