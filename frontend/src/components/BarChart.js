import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ currentOrderTotal }) => {
  const chart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Orders",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [
          currentOrderTotal(4),
          currentOrderTotal(3),
          currentOrderTotal(2),
          currentOrderTotal(1),
          currentOrderTotal(0),
        ],
      },
    ],
  };

  return <Bar data={chart} />;
};

export default BarChart;
