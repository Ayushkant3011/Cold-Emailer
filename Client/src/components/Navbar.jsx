import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: 10 }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/send">Send Email</Link> |{" "}
      <Link to="/templates">Templates</Link>
    </nav>
  );
}

export default Navbar;
