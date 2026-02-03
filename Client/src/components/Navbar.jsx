import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { dark, setDark } = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="glass-navbar">
      <div className="nav-left">
        <span className="logo">ColdMailer</span>

        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/send" className="nav-link">
          Send
        </NavLink>
        <NavLink to="/templates" className="nav-link">
          Templates
        </NavLink>
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <button
          className="logout-btn"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
