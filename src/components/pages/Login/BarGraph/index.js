import React, { useEffect } from "react";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

const data = [
  // {
  //   type: "1600",
  //   sales: 38,
  // },
  // {
  //   type: "1500",
  //   sales: 52,
  // },
  // {
  //   type: "1400",
  //   sales: 61,
  // },
  // {
  //   type: "1300",
  //   sales: 145,
  // },
  // {
  //   type: "1200",
  //   sales: 48,
  // },
  // {
  //   type: "1100",
  //   sales: 38,
  // },
  // {
  //   type: "1000",
  //   sales: 38,
  // },
  // {
  //   type: "900",
  //   sales: 38,
  // },
  // {
  //   type: "800",
  //   sales: 38,
  // },
  // {
  //   type: "700",
  //   sales: 52,
  // },
  {
    type: "600",
    sales: 61,
  },
  {
    type: "500",
    sales: 145,
  },
  {
    type: "400",
    sales: 48,
  },
  {
    type: "300",
    sales: 38,
  },
  {
    type: "200",
    sales: 38,
  },
  {
    type: "100",
    sales: 38,
  },
];

const BarGraph = () => {
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      options: {
        indexAxis: "y",

        scales: {
          x: {
            // stacked: false,
            grid: {
              offset: true,
            },
          },
          y: {
            grid: {
              // offset: false,
            },
          },
        },
      },
      data: {
        labels: ["100", "150", "200", "250", "300", "350", "400"].reverse(),
        datasets: [
          {
            label: "Label",
            data: [12, 19, 3, 5, 12, 19, 3, 5],
            backgroundColor: [
              "#0179fe",
              "#0179fe",
              "#0179fe",
              "#0179fe",
              "#e5f1ff",
              "#e5f1ff",
              "#e5f1ff",
            ],
            barThickness: 10,
            borderWidth: 0,
            borderRadius: 15,
          },
        ],
      },
    });
  });

  return (
    <div style={{ color: "#fff" }}>
      <div style={{ width: 400, height: 400, rotate: "x 90deg" }} className="">
        <canvas
          style={{ rotate: "x 90deg" }}
          id="myChart"
          width="100px"
          height="100px"
        />
      </div>
    </div>
  );
};

export default BarGraph;
