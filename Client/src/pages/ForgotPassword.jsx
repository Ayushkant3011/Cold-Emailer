import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css"; // Reuse the same CSS for now

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(response.data.message || "Password reset email sent!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="brand-logo">Cold<span>Emailer</span></div>

        <h2>Forgot Password</h2>
        <p className="subtitle">Enter your email to request a reset link</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="success-text" style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        {error && <p className="error-text" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <p className="footer-text">
          Remember your password? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
