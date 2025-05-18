import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx"; // create this file/component
import Login from "../pages/Login.jsx"
import Navbar from "../components/Navbar.jsx"
import Profile from "../pages/Profile.jsx";
import ApprovedEvents from "../pages/ApprovedEvents.jsx";
import ProtectedRoute from "../auth/ProtectedRoutes.jsx";
import AllEvents from "../pages/AllEvents.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";


function AppRoutes() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"element = {<Login/>}></Route>
        <Route path="/profile"element ={<Profile></Profile>}/>
        <Route
          path="/approvedEvents"
          element={
            <ProtectedRoute allowedRoles={["Standard User",""]}>
              <ApprovedEvents />
            </ProtectedRoute>
          }
        />
        <Route 
        path='/allEvents'
        element ={<ProtectedRoute allowedRoles={"System Admin"}>
          <AllEvents/> 
          </ProtectedRoute>}>
        </Route>
        <Route path='/unauthorized' element={<Unauthorized/>}></Route>
      </Routes>
      </>
  );
}

export default AppRoutes;
