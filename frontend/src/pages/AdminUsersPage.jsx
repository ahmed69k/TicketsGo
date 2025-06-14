import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import UserRow from "../components/UserRow.jsx";
import "../styling/AdminUsersPage.css";


function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = (user) => {
    navigate(`/admin/users/${user._id}/edit-role`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  };
    if (loading){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <img src="/loader.gif" alt="Loading..." style={{ width: 500, height: 500 }} />
      </div>
    )
  }
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
    <div className="users-page">
      <h1>Users List</h1>
      <input
        type="text"
        placeholder="Search users..."
        className="search-input-users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.length === 0 ? (
        <p className="no-event">No users found!</p>
      ) : (
        <div className="users-list-container">
          {filteredUsers.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onUpdateRole={handleUpdateRole}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsersPage;
