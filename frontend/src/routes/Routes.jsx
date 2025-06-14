import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Navbar from "../components/Navbar.jsx";
import Profile from "../pages/Profile.jsx";
import ApprovedEvents from "../pages/ApprovedEvents.jsx";
import ProtectedRoute from "../auth/ProtectedRoutes.jsx";
import AllEvents from "../pages/AllEvents.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import AdminUsersPage from "../pages/AdminUsersPage.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import Peaky from "../pages/peak.jsx";
import CreateEvent from "../pages/CreateEvent.jsx";
import MyEvents from "../pages/MyEvents.jsx"; 
import EventDetails from "../pages/EventsDetails.jsx";
import UpdateUserRolePage from "../pages/UpdateUserRolePage.jsx"; 
import UserBookings from "../pages/UserBookings";
import EditEvent from "../pages/EditEvent.jsx"; 

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/approvedEvents"
          element={
            <ProtectedRoute allowedRoles={["Standard User", "System Admin", "Organizer"]} allowPublic = {true}>
              <ApprovedEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allEvents"
          element={
            <ProtectedRoute allowedRoles={"System Admin"}>
              <AllEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={"System Admin"}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-events"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id/edit-role"
          element={
            <ProtectedRoute allowedRoles={"System Admin"}>
              <UpdateUserRolePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/peak" element={<Peaky />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={["Standard User"]}>
              <UserBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
