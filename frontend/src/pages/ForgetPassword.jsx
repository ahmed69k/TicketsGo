import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from "../services/api";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Trying to reset password for:", email); // ✅ logs current email

    try {
      const response = await axios.get(`${import.meta.env.BACKEND_LINK_RAILWAY}/api/v1/forgot-password`, {
        params: { email },
        withCredentials: true,
      });

      toast.success(response.data.message || "Reset link sent!");
    } catch (error) {
      console.error("Error sending reset link", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='login-page'>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={30}
            required
          />
        </div>
        <div className='submit-wrapper'>
          <button className='button-lr' type="submit">Send Reset Link</button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
