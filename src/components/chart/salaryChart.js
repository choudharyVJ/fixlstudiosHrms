import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SalaryChart({ departments }) {
  const labels = departments.map((dept) => dept.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Average Salary",
        data: departments.map((dept) => dept.averageSalary),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <div className="font-semibold mb-4">Salary Chart</div>
      <Bar options={options} data={data} />
    </div>
  );
}
