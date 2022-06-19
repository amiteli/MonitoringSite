import { Box, Grid, Typography } from "@mui/material";
import React from "react";
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

const calcHeaderWidth = (devices: Array<oneDevice>) => {
  let size = devices.length;
  return devices.length * 60 + 2;
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
            return <StationDevice key={index} data={deviceUnit} />;
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default OneStation;
