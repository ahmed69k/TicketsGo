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
            <h1>Hello {user.name}</h1>
          </div>
          
        ):
        <div>
          <h1 className='h1-home'> Welcome to TicketsGo! </h1>
          <h2 className ='h2-home'> To book tickets please log-in or register:</h2>
          <div className='button-container'>
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <Link to='/register'>
              <button>Register</button>
            </Link>
          </div>
        </div>
        }
      </>
    );
}

export default Home