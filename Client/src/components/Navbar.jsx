import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h3>ColdMailer</h3>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/send">Send</Link>
        <Link to="/templates">Templates</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#222",
    color: "#fff"
  }
};

export default Navbar;
