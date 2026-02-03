import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import useScrollParallax from "../hooks/useScrollParallax";

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
  const y = useScrollParallax(0.06);

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
          <motion.div
            key={i}
            className={`stat-card ${card.className || ""}`}
            style={{ transform: `translateY(${y}px)` }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.04 }}
          >
            <p className="stat-label">{card.label}</p>
            <h2 className="stat-value">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="chart-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h3>Email Overview</h3>
        <Bar data={chartData} />
      </motion.div>
    </>
  );
}

export default DashboardStats;
