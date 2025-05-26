import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import '../styling/UpdateRole.css'

function UpdateUserRolePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
        setRole(res.data.role);
      } catch (err) {
        console.error("Error loading user:", err);
        toast.error("Failed to load user!");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, { role });
      toast.success("Role updated successfully!");

      setTimeout(() => {
        navigate("/users");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Failed to update role! Did you select a role?");
    }
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="update-role-container">
      <h1 className="title-ur">Update Role</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-ee">
          <label htmlFor="role"><strong>Select New Role:</strong></label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select a role</option>
            <option value="Standard User">Standard User</option>
            <option value="System Admin">System Admin</option>
            <option value="Organizer"> Organizer</option>
          </select>
        </div>

        <div className="submit-wrapper-ee">
          <button className="button-lr" type="submit">
            Update Role
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserRolePage;
