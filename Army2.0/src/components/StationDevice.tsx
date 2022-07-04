import { Grid, Typography } from "@mui/material";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import CustomProgressBar from "./CustomProgressBar";

type IProps = {
  data: oneDevice;
};
type oneDevice = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const DEVICE_WIDTH: number = 80;

const percentCalculator = (
  okNum: number,
  errorNum: number,
  failNum: number
) => {
  const sum = okNum + errorNum + failNum;
  const eachNum = 100 / sum;

  const okPercent = okNum * eachNum;
  const errorPercent = errorNum * eachNum;
  const failPercent = failNum * eachNum;

  return { okPercent, errorPercent, failPercent };
};

const StationDevice = (props: IProps) => {
  const {
    device,
    OK: okNumber,
    ERROR: errorNumber,
    FAILED: failedNumber,
  } = props.data;

  const { okPercent, errorPercent, failPercent } = percentCalculator(
    okNumber,
    errorNumber,
    failedNumber
  );

  const arrayOfPercents = [okPercent, errorPercent, failPercent];
  //   console.log(arrayOfPercents);

  const arrayOfLabel = [okNumber, errorNumber, failedNumber];

  return (
    // <Grid container direction="row">
    <Grid
      item
      container
      sx={{ width: DEVICE_WIDTH, border: 1, borderColor: "#D3D3D3", px: 0.5}}
    >
      <Grid item xs={12}>
        <Typography align="center" sx={{ fontWeight: "bold" }}>
          {device}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomProgressBar percents={arrayOfPercents} labels={arrayOfLabel} />
        {/* <CustomProgressBar percents={[50, 50, 0]} labels={arrayOfLabel} /> */}
      </Grid>
    </Grid>
  );
};

export default StationDevice;
