import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styling/Login.css'
import {toast} from 'react-toastify'

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      await axios.post("http://localhost:3000/api/v1/login", { email, password }, { withCredentials: true });
      console.log("Login Successful!");
      setTimeout(()=>{
        navigate('/profile');
        window.location.reload()
      },1000)
      
    } catch (e) {
        setError("Invalid email or password.")
      console.log("Login Error", e);
    }
  };

  return (
    <><div className='login-page'>
      <h1>Login</h1>
      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#b91c1c",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "16px",
          border: "1px solid #fca5a5"
        }}>
          {error}
        </div>
      )}
        <form onSubmit={handleSubmit}>
    <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size={30}
        />
    </div>
    <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size={30}
        />
    </div>
    <div className='submit-wrapper'>
        <button className='button-lr'type="submit" onClick={()=> toast.success("Logged in successfully!")}>Submit</button>
    </div>
    </form>
      </div>
    </>
  );
}

export default Login;
