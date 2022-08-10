import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Box } from "@mui/system";

type IProps = {
  labels: Array<string>;
  data: Array<number>;
  chartTitle: string;
};
const chartStatus = ["תקין", "תקול", "תקלה מינורית"];

const DoughuntChart = (props: IProps) => {
  const { labels, data, chartTitle } = props;

  const allData = {
    labels: chartStatus,
    datasets: [
      {
        label: "RCGW",
        data: data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",

          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",

          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    // responsive: true,
    maintainAspectRatio: true,
    cutout: "80%",
    plugins: {
      legend: {
        position: "bottom" as "bottom",
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 20,
        },
        padding: {
          top: 5,
          bottom: 10,
        },
      },
    },
    
  };
  return (
      <Doughnut data={allData} options={options}/>
  );
};

export default DoughuntChart;
