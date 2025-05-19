import { Link } from "react-router-dom";
import '../styling/Home.css';
import { useAuth } from "../auth/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <div className="logged-in">
          <h1>Hello 👋, {user.name}</h1>
          <div className="home-container">
            <div className="hi-text">
              <h2>🎉 Explore the hottest events for the season!</h2>
              <h3>
                From talents like <span>Metallica</span> and{" "}
                <Link className="peak" to="/peak">Ahmed Assem</Link> (type shift)
              </h3>

              <ul className="fancy-points">
                <li>✅ Book your seat in just a few clicks</li>
                <li>🔥 Personalized suggestions based on your taste</li>
                <li>📍 Discover nearby events and festivals</li>
              </ul>

              <Link to="/approvedEvents">
                <button className="button-lr">Explore Events</button>
              </Link>
            </div>
            <img
              className="home-image"
              src="https://3ca9a566.delivery.rocketcdn.me/wp-content/uploads/2023/06/metallica_m72_world_tour_10.jpg"
              alt="Event"
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="h1-home">🎟️ Welcome to TicketsGo!</h1>
          <p className="p1-home">To book tickets or check out events please log in or register:</p>

          <div className="button-container">
            <Link to="/login">
              <button className="button-lr">Login</button>
            </Link>
            <Link to="/register">
              <button className="button-lr">Register</button>
            </Link>
          </div>

          <div className="features">
            <h3>Why TicketsGo? 👇</h3>
            <ul className="fancy-points">
              <li>✅ Fast & secure ticket booking</li>
              <li>🧠 Smart recommendations tailored to your vibe</li>
              <li>📅 Stay updated on trending events</li>
              <li>💳 Multiple payment methods & instant confirmations</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
