import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import StationDevice from "./StationDevice";

type IProps = {
  location: string;
  devices: Array<oneDevice>;
};
type oneDevice = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const DEVICE_WIDTH: number = 80;

const calcHeaderWidth = (devices: Array<oneDevice>) => {
  return devices.length * DEVICE_WIDTH + 2;
};

const OneStation = (props: IProps) => {
  const { location, devices } = props;

  
  return (
    <Grid item>
      <Box
        sx={{
          border: 1,
          borderColor: "#D3D3D3",
          m: 1,
          width: () => calcHeaderWidth(devices),
        }}
      >
        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{
            borderBottom: 1,
            borderColor: "#D3D3D3",
            fontSize: 20,
            fontWeight: "bold",
            width: () => calcHeaderWidth(devices),
          }}
        >
          {location}
        </Typography>
        <Grid item container direction="row">
          {devices?.map((deviceUnit, index) => {
            return <StationDevice key={index} data={deviceUnit} location={location}/>;
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default OneStation;