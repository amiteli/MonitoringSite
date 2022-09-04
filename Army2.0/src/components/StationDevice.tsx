import { Grid, Typography } from "@mui/material";
import { Button, ProgressBar } from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";
import { Navigate, useNavigate } from "react-router-dom";
import CustomProgressBar from "./CustomProgressBar";
import { useDispatch } from "react-redux";
import { setData } from "../redux/filterTable";

type IProps = {
  data: oneDevice;
  location: string;
  devicesLen: number;
};
type oneDevice = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const calcHeaderWidth = (devicesLen: number) => {
  return 100 / devicesLen + "%";
};

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
  const { data, location, devicesLen } = props;

  const {
    device,
    OK: okNumber,
    ERROR: errorNumber,
    FAILED: failedNumber,
  } = data;

  const { okPercent, errorPercent, failPercent } = percentCalculator(
    okNumber,
    errorNumber,
    failedNumber
  );
  const dispatch: any = useDispatch();

  const arrayOfPercents = [okPercent, errorPercent, failPercent];

  const arrayOfLabel = [okNumber, errorNumber, failedNumber];
  const navigate = useNavigate();

  const navigateToTable = (device: string, location: string) => {
    const columnField = "שם רכיב";
    const operatorValue = "contains";
    const value = location;
    dispatch(setData({ columnField, operatorValue, value }));
    navigate(`/device-monitor/${device}`);
  };
  // const colorsOfDevices:any = {
  //   RCGW: "#FF1E56",
  //   Makmash: "#323232",
  //   CCU: "#293A80",
  //   CCT: "#D65A31",
  //   Yadbar: "#D72323",
  //   Deploy: "#62A388",
  // };
  return (
    <Grid
      item
      container
      bgcolor={"#2E3B55"}
      sx={{
        width: () => calcHeaderWidth(devicesLen),
        border: 1,
        borderColor: "white",
        // borderColor: "#D3D3D3",
        px: 0.3,
        
        // color:"white",bgcolor:"#2E3B55"
      }}
    >
      <Grid item xs={12}>
        <Typography
          paddingLeft={1.5}
          paddingRight={1.5}
          align="center"
          sx={{  cursor: "pointer", p: "1px", }}
          color={"white"}

          onClick={() => navigateToTable(device, location)}
        >
          {device}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomProgressBar percents={arrayOfPercents} labels={arrayOfLabel} />
      </Grid>
    </Grid>
  );
};

export default StationDevice;
