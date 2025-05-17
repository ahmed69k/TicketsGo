import { Link } from "react-router-dom";
import '../styling/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className ='back2home'to='/'>
        <h1 className="name">TicketsGo 🎟️</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
