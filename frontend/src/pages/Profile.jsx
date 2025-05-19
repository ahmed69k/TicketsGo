import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styling/Profile.css';
import { toast } from 'react-toastify';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: ''
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile(res.data);
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          profilePicture: res.data.profilePicture || ''
        });
      } catch (e) {
        setError("Error fetching profile");
        console.log("Error fetching profile:", e);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/users/profile', formData);
      setProfile(res.data.user);
      toast.success(res.data.message || "Profile updated!");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error("Update error:", err);
    }
  };

  if (error) return <div className="profile-container">{error}</div>;
  if (!profile) return <div className="profile-container">Loading...</div>;

  return (
    <div className='profile-container'>
      <h1>Profile</h1>

      {!editing ? (
        <div className='profile-box'>
          <p className='name-prof'><strong>{profile.name}</strong></p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <div className='container-pfp'>
          <p style={{margin: 0}}><strong>Profile Picture:</strong> {
            profile.profilePicture
              ? <img src={profile.profilePicture} alt="Profile" style={{ width: 80, height: 80, borderRadius: "50%" }} />
              : <span style={{marginLeft: "100px"}}>No Picture Provided</span>
          }</p>
          </div>
          <div className="submit-wrapper">
            <button onClick={() => setEditing(true)} className='button-lr'>Edit Profile</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className='profile-form'>
          <div className='input-group'>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className='input-group'>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className='input-group'>
            <label>Profile Picture URL:</label>
            <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
          </div>
          <div className='submit-wrapper'>
            <button type="submit" className='button-lr'>Save</button>
            <button type="button" onClick={() => setEditing(false)} className='button-lr'>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
