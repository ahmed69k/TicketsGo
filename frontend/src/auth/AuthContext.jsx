import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Determine login state
  const isLoggedIn = !!user;

  // Fetch current user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.BACKEND_LINK_RAILWAY}/api/v1/users/profile`, {
          withCredentials: true,
        });
        setUser(res.data); // Set authenticated user
      } catch (e) {
        console.log("User not authenticated:", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        credentials,
        { withCredentials: true }
      );
      if (response.data && response.data.user) {
        setUser(response.data.user);
        return true;
      }
      throw new Error(response.message || "Login failed");
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Show a loading screen while checking login
  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access auth values
export function useAuth() {
  return useContext(AuthContext);
}
