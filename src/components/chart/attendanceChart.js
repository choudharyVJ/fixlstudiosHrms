import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AttendanceChart({ attendanceData }) {
  const data = {
    labels: attendanceData.labels,
    datasets: [
      {
        label: "Attendance %",
        data: attendanceData.data,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <div className="font-semibold mb-4">Attendance Chart</div>
      <Line options={options} data={data} />
    </div>
  );
}
