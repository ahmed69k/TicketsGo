import React from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import '../styling/Register.css'

function Register() {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[name,setName] = useState("")
  const[profilePicture, setProfilePicture] = useState("")
  const[role, setRole] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")
    try{
      await api.post('/register',
      {email,password,name,profilePicture,role},
      {withCredentials: true});
      setTimeout(() =>{
        navigate('/login')
        toast.success("Register Sucessful!")
        window.location.reload()
      },1000)
    }
    catch(e){
      console.log("Error registering:",e);
    }
  };
  return (
    <>
    <div className="register-page">
      <h1>Register</h1>
    <form onSubmit={handleSubmit}>
    <div className="input-group">
      <label htmlFor="name">Name: </label>
      <input
      id = "name"
      type ="name"
      value={name}
      onChange={(e)=> setName(e.target.value)}
      ></input>
    </div>
    <div className="input-group">
      <label htmlFor="email">Email: </label>
      <input
      id = "email"
      type ="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      ></input>
    </div>
    <div className="input-group">
      <label htmlFor="password">Password: </label>
      <input
      id = "password"
      type ="password"
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      ></input>
    </div>
        <div className="input-group">
      <label htmlFor="role">Role: </label>
      <select
      id = "role"
      value={role}
      onChange={(e)=> setRole(e.target.value)}
      >
        <option value="">Select a role</option>
        <option value="Standard User">Standard User</option>
        <option value="System Admin">System Admin</option>
        <option value="Organizer">Event Organizer</option>
      </select>
    </div>
    <div className="input-group">
      <label htmlFor="pp">Profile Picture: </label>
      <input
      id = "pp"
      type ="pp"
      value={profilePicture}
      onChange={(e)=> setProfilePicture(e.target.value)}
      ></input>
    </div>
    <div className='submit-wrapper'>
        <button className='button-lr'type="submit" >Submit</button>
    </div>
    </form>
    </div>
    </>

    
  );
}

export default Register;
