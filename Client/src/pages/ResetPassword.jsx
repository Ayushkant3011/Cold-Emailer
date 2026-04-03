import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Register.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message || "Password has been updated!");
      setTimeout(() => navigate("/"), 2000); // go to login
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="brand-logo">Cold<span>Emailer</span></div>

        <h2>Reset Password</h2>
        <p className="subtitle">Enter your new secure password</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && <p className="success-text" style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        {error && <p className="error-text" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <p className="footer-text">
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
