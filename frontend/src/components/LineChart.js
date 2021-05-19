import React from "react";
import { Line } from "react-chartjs-2";

const cat1 = "Fruity";
const cat2 = "Casual";
const cat3 = "Luxury";

const LineChart = ({ CategoryTotalPerMonth }) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Fruity",
        data: [
          CategoryTotalPerMonth(4, cat1),
          CategoryTotalPerMonth(3, cat1),
          CategoryTotalPerMonth(2, cat1),
          CategoryTotalPerMonth(1, cat1),
          CategoryTotalPerMonth(0, cat1),
        ],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        // scaleOverride: true,
        scaleStartValue: 0,
        scaleStepWidth: 1,
        scaleSteps: 5,
      },
      {
        label: "Casual",
        data: [
          CategoryTotalPerMonth(4, cat2),
          CategoryTotalPerMonth(3, cat2),
          CategoryTotalPerMonth(2, cat2),
          CategoryTotalPerMonth(1, cat2),
          CategoryTotalPerMonth(0, cat2),
        ],
        fill: false,
        borderColor: "#742774",
        //scaleOverride: true,
        scaleStartValue: 0,
        scaleStepWidth: 1,
        scaleSteps: 5,
      },
      {
        label: "Luxury",
        data: [
          CategoryTotalPerMonth(4, cat3),
          CategoryTotalPerMonth(3, cat3),
          CategoryTotalPerMonth(2, cat3),
          CategoryTotalPerMonth(1, cat3),
          CategoryTotalPerMonth(0, cat3),
        ],
        fill: false,
        borderColor: "#C9DE00",
        //scaleOverride: true,
        scaleStartValue: 0,
        scaleStepWidth: 1,
        scaleSteps: 5,
      },
    ],

    options: {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: true,
        position: "right",
      },
      scales: {
        yAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              min: 0,
              max: 20,
            },
          },
        ],
      },
    },
  };
  return <Line data={data} />;
};

export default LineChart;
