import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx"; // create this file/component
import Login from "../pages/Login.jsx"
import Navbar from "../components/Navbar.jsx"
import Profile from "../pages/Profile.jsx";

function AppRoutes() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"element = {<Login/>}></Route>
        <Route path="/profile"element ={<Profile></Profile>}/>
      </Routes>
    </>
  );
}

export default AppRoutes;
