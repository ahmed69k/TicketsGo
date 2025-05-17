import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styling/Profile.css'

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile(res.data);
      } catch (e) {
        setError("Error fetching profile");
        console.log("Error fetching profile:", e);
      }
    };
    fetchProfile();
  }, []);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <p><strong>Name: </strong>{profile.name}</p>
      <p><strong>Role: </strong>{profile.email}</p>
      <p><strong>Role: </strong>{profile.role}</p>
      <p><strong>Profile Picture: </strong>
      {profile.profilePicture
      ?
      <img src={profile.profilePicture} alt="Profile" style={{ width: 80, height: 80, borderRadius: "50%" }} />
      : "No Picture"
      }
      </p>
      
    </div>
  );
}

export default Profile;