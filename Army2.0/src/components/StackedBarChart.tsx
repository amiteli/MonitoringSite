import { Bar } from "react-chartjs-2";

type IProps = {
  labels: Array<string>;
  dataOK: Array<number>;
  dataFAILED: Array<number>;
  dataERROR: Array<number>;
  chartTitle: string;
};

const chartStatus = ["תקין", "תקול", "תקלה מינורית"];

const StackedBarChart = (props: IProps) => {
  const { labels, dataOK, dataFAILED, dataERROR, chartTitle } = props;

  const data = {
    labels,
    datasets: [
      {
        label: chartStatus[0],
        data: dataOK,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },

      {
        label: chartStatus[2],
        data: dataERROR,
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: chartStatus[1],
        data: dataFAILED,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
