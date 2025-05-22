import React, { useState, useEffect } from "react";
import api from "../services/api";
import UserRow from "../components/UserRow.jsx";
import "../styling/AdminUsersPage.css";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = (user) => {
    
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  };

  return (
    <div className="users-page">
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p className="no-event">No users found!</p>
      ) : (
        <div className="users-list-container">
          {users.map((user) => (
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
