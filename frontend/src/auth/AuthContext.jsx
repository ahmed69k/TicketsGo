import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/profile", {
          withCredentials: true,
        });
        console.log("Profile res.data:", res.data); // 👈 Inspect the structure
        setUser(res.data.user); // ✅ Use `res.data.user` if user object is wrapped
      } catch (e) {
        console.log(e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", credentials, {
        withCredentials: true,
      });
      if (response.data) {
        setUser(response.data.user); // 👌 Already correct
        return true;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
