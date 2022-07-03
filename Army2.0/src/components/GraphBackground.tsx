import { Paper } from "@mui/material";
import React from "react";

type IProps = {
  widthSize: string | number;
  heightSize: string | number;
};

const GraphBackground = (props: IProps) => {
  const { widthSize, heightSize } = props;
  return (
    <Paper
      elevation={3}
      sx={{
        width: widthSize,
        height: heightSize,
        backgroundColor: "#D3D3D3",
      }}
    ></Paper>
  );
};

export default GraphBackground;
