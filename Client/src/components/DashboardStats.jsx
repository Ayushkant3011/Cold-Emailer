import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function DashboardStats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));
  }, []);

  const data = {
    labels: ["Sent", "Pending", "Failed"],
    datasets: [
      {
        label: "Emails",
        data: [stats.sent, stats.pending, stats.failed],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"]
      }
    ]
  };

  return (
    <div style={{ width: "60%", margin: "30px auto" }}>
      <h2>Email Stats</h2>
      <Bar data={data} />
    </div>
  );
}

export default DashboardStats;
