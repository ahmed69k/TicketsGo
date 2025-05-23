import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Login.css";
import { toast } from "react-toastify";
import api from '../services/api.jsx'

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [error, setError] = useState("");
  const [devMode, setDevMode] = useState(false);
  const [devPin, setDevPin] = useState("");
  const [pinValid, setPinValid] = useState(false);
  const navigate = useNavigate();

  const validateDevPin = () => {
    const correctPin = "1029";
    return devPin === correctPin;
  };

  const handleLoginNoMFA = async (e) => {
    e.preventDefault()
    setError("")
    try{
      const res = await api.post("/login", {
        email,
        password,
        devMode: true
      }, { withCredentials: true });
      toast.success("Developper Login Successfull!")
      navigate('/profile')
      setTimeout(() =>{
        window.location.reload()
      },2000);

    }
    catch (e) {
      setError(e.response?.data?.message || "Invalid email or password.");
      console.log("Login Error", e);
    }
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.mfaRequired) {
        setUserId(res.data.userId);
        setMfaRequired(true);
        toast.info("OTP sent to your email, check it!");
      } else {
        toast.success("Logged in successfully!");
        navigate("/profile");
        window.location.reload();
      }
    } catch (e) {
      setError(e.response?.data?.message || "Invalid email or password.");
      console.log("Login Error!!!!", e);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(
        "/verify-otp",
        { userId, otp },
        { withCredentials: true }
      );

      toast.success("Login verified! Redirecting...");
      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 1000);
    } catch (e) {
      setError(e.response?.data?.message || "Invalid OTP.");
      console.log("OTP Verification Error", e);
    }
  };

return (
  <div className="login-page">
    <h1>Login</h1>

    {error && (
      <div
        style={{
          background: "#fee2e2",
          color: "#b91c1c",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "16px",
          border: "1px solid #fca5a5",
        }}
      >
        {error}
      </div>
    )}

    {!mfaRequired ? (
      <form
        onSubmit={(e) => {
          if (devMode && validateDevPin()) {
            handleLoginNoMFA(e);
          } else {
            handleLoginSubmit(e);
          }
        }}
      >
        <div className="input-group">
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

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size={30}
            required
          />
        </div>

        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={devMode}
              onChange={(e) => {
                setDevMode(e.target.checked);
                if (!e.target.checked) {
                  setDevPin("");
                }
              }}
            />
            Developer Login (no MFA)
          </label>
        </div>

        {devMode && (
          <div className="input-group">
            <label htmlFor="dev-pin">Enter Dev PIN:</label>
            <input
              id="dev-pin"
              type="password"
              value={devPin}
              onChange={(e) => setDevPin(e.target.value)}
              size={10}
              required
            />
          </div>
        )}

        <div className="submit-wrapper">
          <button className="button-lr" type="submit">
            Submit
          </button>
        </div>
        <div className="submit-wrapper">
          <button
            type="button"
            className="button-lr"
            onClick={() => navigate("/forgot-password")}
          >
            Forget Password?
          </button>
        </div>
      </form>
    ) : (
      // MFA OTP input form
      <form onSubmit={handleOtpSubmit}>
        <p>
          Enter the OTP sent to <strong>{email}</strong>!
        </p>
        <div className="input-group">
          <label htmlFor="otp">OTP Code:</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            size={6}
            required
            autoFocus
          />
        </div>
        <div className="submit-wrapper">
          <button className="button-lr" type="submit">
            Verify OTP
          </button>
        </div>
        <div className="submit-wrapper">
          <button
            type="button"
            className="button-lr"
            onClick={() => {
              setMfaRequired(false);
              setOtp("");
              setUserId(null);
            }}
          >
            Back to Login
          </button>
        </div>
      </form>
    )}
  </div>
);

}

export default Login;
