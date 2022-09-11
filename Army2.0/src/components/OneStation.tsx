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

const OneStation = (props: IProps) => {
  const { location, devices } = props;
  return (
    <Grid item>
      <Box
        sx={{
          border: 1,
          // borderColor: "#D3D3D3",
          borderColor: "white",
          m: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          align="center"
          paddingLeft={1.5}
          paddingRight={1.5}
          sx={{
            borderBottom: 1,
            // borderColor: "#D3D3D3",
            borderColor: "white",
            fontSize: 17,
            fontWeight: "bold",
            backgroundColor:"#2E3B55",
            color:"#F0BC5E"
          }}
        >
          {location}
        </Typography>
        <Grid item container direction="row">
          {devices?.map((deviceUnit, index) => {
            return <StationDevice key={index} data={deviceUnit} location={location} devicesLen={devices.length}/>;
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default OneStation;