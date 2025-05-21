// UserRow.jsx
import React from "react";
import pic from '../assets/defaultpfp.jpg'

function UserRow({ user, onUpdateRole, onDelete }) {
  return (
    <div className="user-box">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={user.profilePicture ? `http://localhost:3000${user.profilePicture}` : pic}
          alt={`${user.name} profile`}
          style={{
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: '20%',
          }}
        />
        <h2 style={{ margin: 0 }}>{user.name}</h2>
      </div>

      <p><strong>ID: </strong>{user._id}</p>
      <p><strong>Email: </strong>{user.email}</p>
      <p><strong>Role: </strong>{user.role}</p>
      <p><strong>Joined At: </strong>{new Date(user.timestamp).toLocaleDateString()}</p>

      <div style={{ marginTop: "1rem" }}>
        <button className="update-btn" onClick={() => onUpdateRole(user)}>Update Role</button>
        <button className="delete-btn" onClick={() => onDelete(user._id)}>Delete</button>
      </div>
    </div>
  );
}


export default UserRow;
