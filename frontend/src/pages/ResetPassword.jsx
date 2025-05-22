import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from "../services/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // ✅ Get token from URL
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    try {
      const response = await api.put("/api/v1/reset-password", {
        token,
        password
      });

      toast.success(response.data.message || "Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className='login-page'>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor="password">New Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size={30}
            required
          />
        </div>
        <div className='submit-wrapper'>
          <button className='button-lr' type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
