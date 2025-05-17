import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx"; // create this file/component
import Login from "../pages/Login.jsx"
import Navbar from "../components/Navbar.jsx"




function AppRoutes() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"element = {<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
