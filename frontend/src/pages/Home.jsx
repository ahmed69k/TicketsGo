import { useState } from "react";
import { Link } from "react-router-dom";
import '../styling/Home.css'


function Home(){
    return (
      <>
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
      </>
    );
}

export default Home