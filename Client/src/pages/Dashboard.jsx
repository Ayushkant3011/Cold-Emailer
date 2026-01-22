import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));

    axios.get("http://localhost:5000/api/dashboard/history", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setEmails(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Card title="Total" value={stats.total} />
        <Card title="Sent" value={stats.sent} />
        <Card title="Pending" value={stats.pending} />
        <Card title="Failed" value={stats.failed} />
      </div>

      {/* Table */}
      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Retry</th>
          </tr>
        </thead>
        <tbody>
          {emails.map(email => (
            <tr key={email._id}>
              <td>{email.to}</td>
              <td>
                <StatusBadge status={email.status} />
              </td>
              <td>{email.retryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div style={{ padding: 20, border: "1px solid gray" }}>
    <h3>{title}</h3>
    <h2>{value || 0}</h2>
  </div>
);

const StatusBadge = ({ status }) => {
  const color =
    status === "sent" ? "green" :
    status === "pending" ? "orange" : "red";

  return <span style={{ color }}>{status}</span>;
};

export default Dashboard;
