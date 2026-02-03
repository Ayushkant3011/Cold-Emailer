import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import EmailTable from "../components/EmailTable";

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

    const headers = {
      Authorization: `Bearer ${token}`
    };

    Promise.all([
      axios.get("http://localhost:5000/api/dashboard/stats", { headers }),
      axios.get("http://localhost:5000/api/dashboard/history", { headers })
    ])
      .then(([statsRes, emailsRes]) => {
        setStats(statsRes.data);
        setEmails(emailsRes.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1 className="page-title">Dashboard</h1>

        {/* Stats + Chart */}
        <DashboardStats stats={stats} />

        {/* Email History Table */}
        <EmailTable emails={emails} />
      </div>
    </>
  );
}

export default Dashboard;
