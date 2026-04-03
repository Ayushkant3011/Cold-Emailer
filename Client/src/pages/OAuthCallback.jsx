import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Connecting Gmail...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (!code) {
      setStatus("Error: No authorization code found.");
      return;
    }

    const connectGmail = async () => {
      try {
        await axios.post("http://localhost:5000/api/oauth/google/callback", { code });
        setStatus("Gmail connected successfully! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (err) {
        setStatus("Failed to connect Gmail. " + (err.response?.data?.message || ""));
      }
    };

    connectGmail();
  }, [location, navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "white" }}>
      <h2>{status}</h2>
    </div>
  );
}

export default OAuthCallback;
