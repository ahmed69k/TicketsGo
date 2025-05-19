import { useState } from "react";
import { Link } from "react-router-dom";
import '../styling/Home.css'
import { useAuth } from "../auth/AuthContext";


function Home(){
  const{user} = useAuth()
    return (
      <>
        {user ? (
          <div className = 'logged-in'>
            <h1>Hello 👋, {user.name}</h1>
            <div className="home-container">
            <div className="hi-text">
              <h2>Explore the hottest events for the season!</h2>
              <h3>From talents like <label htmlFor="">Metallica</label> and <Link className ='peak'to='/peak'>Ahmed Assem</Link> (type shift)</h3>
              </div>
              <img className ='home-image'src="https://3ca9a566.delivery.rocketcdn.me/wp-content/uploads/2023/06/metallica_m72_world_tour_10.jpg"></img>
            </div>

            </div>
          
        ):
        <div>
          <h1 className='h1-home'> Welcome to TicketsGo! </h1>
          <h2 className ='h2-home'> To book tickets or check out events please log-in or register:</h2>
          <div className='button-container'>
            <Link to='/login'>
              <button className="button-lr">Login</button>
            </Link>
            <Link to='/register'>
              <button className="button-lr">Register</button>
            </Link>
          </div>
        </div>
        }
      </>
    );
}

export default Home