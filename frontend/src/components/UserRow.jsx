// UserRow.jsx
import React from "react";
import pic from '../assets/defaultpfp.jpg'

function UserRow({ user, onUpdateRole, onDelete }) {
  return (
    <div className="user-box">
      <h2>{user.name}</h2>
      <p><strong>ID: </strong>{user._id}</p>
      <p><strong>Email: </strong>{user.email}</p>
      <p><strong>Role: </strong>{user.role}</p>
      <strong>
        Profile Picture: <img src={user.profilePicture||pic} alt={''} className="image" />
      </strong>
      <p><strong>Joined At: </strong>{new Date(user.timestamp).toLocaleDateString()}</p>
      <div style={{ marginTop: "1rem" }}>
        <button className="update-btn" onClick={() => onUpdateRole(user)}>Update Role</button>
        <button className="delete-btn" onClick={() => onDelete(user._id)}>Delete</button>
      </div>
    </div>
  );
}

export default UserRow;
