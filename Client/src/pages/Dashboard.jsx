import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import EmailTable from "../components/EmailTable";
import LiquidBlobs from "../components/LiquidBlobs";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    pending: 0,
    failed: 0
  });

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      axios.get("http://localhost:5000/api/dashboard/stats", { headers }),
      axios.get("http://localhost:5000/api/dashboard/history", { headers })
    ]).then(([statsRes, emailsRes]) => {
      setStats(statsRes.data);
      setEmails(emailsRes.data);
    });
  }, []);

  return (
    <>
      <LiquidBlobs />
      <Navbar />

      <div className="page">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="page-title">Dashboard</h1>
          <button
            onClick={async () => {
              try {
                const res = await axios.get("http://localhost:5000/api/oauth/google/url");
                window.location.href = res.data.url;
              } catch (err) {
                alert("Failed to initiate Gmail connection");
              }
            }}
            style={{ padding: "10px 20px", cursor: "pointer", background: "#4285F4", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }}
          >
            Connect Gmail
          </button>
        </div>

        <DashboardStats stats={stats} />
        <EmailTable emails={emails} />
      </div>
    </>
  );
}

export default Dashboard;
