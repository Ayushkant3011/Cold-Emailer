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

function DashboardStats({ stats }) {
  const cards = [
    { label: "Total", value: stats.total },
    { label: "Sent", value: stats.sent, className: "success" },
    { label: "Pending", value: stats.pending, className: "warning" },
    { label: "Failed", value: stats.failed, className: "danger" }
  ];

  const chartData = {
    labels: ["Sent", "Pending", "Failed"],
    datasets: [
      {
        label: "Emails",
        data: [stats.sent, stats.pending, stats.failed],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"]
      }
    ]
  };

  return (
    <>
      <div className="stats-grid">
        {cards.map((card, i) => (
          <div key={i} className={`stat-card ${card.className || ""}`}>
            <p className="stat-label">{card.label}</p>
            <h2 className="stat-value">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="chart-wrapper">
        <h3>Email Overview</h3>
        <Bar data={chartData} />
      </div>
    </>
  );
}

export default DashboardStats;
