"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function BudgetChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "KES " + value.toLocaleString(),
        },
      },
    },
  }

  const data = {
    labels: ["Materials", "Labor", "Equipment", "Subcontractors", "Overhead"],
    datasets: [
      {
        label: "Budget",
        data: [500000, 350000, 150000, 200000, 50000],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: [425000, 280000, 90000, 60000, 20000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="h-[300px]">
      <Bar options={options} data={data} height={300} />
    </div>
  )
}
