import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styling/Profile.css';
import { toast } from 'react-toastify';
import pic from '../assets/defaultpfp.jpg'

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true)
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
        setLoading(false);
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
    if (loading){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <img src="/loader.gif" alt="Loading..." style={{ width: 500, height: 500 }} />
      </div>
    )
  }

  if (error) return <div className="profile-container">{error}</div>;
  if (!profile) return <div className="profile-container">Loading...</div>;

  return (
  <div className='profile-container'>
    <h1>Profile</h1>

    {!editing ? (
      <div className='profile-box'>
        <p 
          className='name-prof' 
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          {profile.profilePicture 
            ? (
              <img 
                src={`http://localhost:3000${profile.profilePicture}`} 
                alt="Profile" 
                style={{ width: 50, height: 50, borderRadius: "20%",objectFit:"cover" }} 
              />
            )
            : (
              <img 
                src={pic} 
                alt="Profile" 
                style={{ width: 40, height: 40, borderRadius: "50%" }} 
              />
            )
          }
          <strong>{profile.name}</strong>
        </p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Joined On:</strong> {new Date(profile.timestamp).toLocaleDateString()}</p>
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
