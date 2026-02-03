import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
