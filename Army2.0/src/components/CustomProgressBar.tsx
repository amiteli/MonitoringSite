import ProgressBar from "react-bootstrap/ProgressBar";

type IProps = {
  percents: Array<number>;
  labels: Array<number>;
};

const BackgroundColors = [
  "#52c234",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 99, 132, 1)",
];

const CustomProgressBar = (props: IProps) => {
  const { percents, labels } = props;
  return (
    <ProgressBar style={{ marginBottom: 5 }}>
      {percents &&
        percents.map((ele, value) => {
          return (
            <ProgressBar
              animated={true}
              style={{ backgroundColor: BackgroundColors[value] }}
              now={ele}
              label={labels[value]}
              key={value}
            />
          );
        })}
    </ProgressBar>
  );
};

export default CustomProgressBar;
