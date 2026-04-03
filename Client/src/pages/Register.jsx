import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="brand-logo">Cold<span>Emailer</span></div>

        <h2>Create Account</h2>
        <p className="subtitle">Register to start sending emails</p>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />



          <button type="submit">Register</button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
