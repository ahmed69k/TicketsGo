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

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("role", role);
  formData.append("profilePicture", profilePicture); // this is the image file bruv

  try {
    await api.post("/register", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // important AF
      },
    });

    setTimeout(() => {
      navigate("/login");
      toast.success("Register Successful!");
      window.location.reload();
    }, 1000);
  } catch (e) {
    console.log("Error registering:", e);
    toast.error("Register failed 💔");
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
      type ="file"
      accept="image/*"
      onChange={(e)=> setProfilePicture(e.target.files[0])}
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
