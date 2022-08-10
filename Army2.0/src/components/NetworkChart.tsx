import { Paper } from "@mui/material";
import { Box, padding } from "@mui/system";
import React, { useState } from "react";
import GeneralAccordion from "./GeneralAccordion";
import StatisticsAcordion from "./StatisticsAcordion";

type IProps = {
  selectedUnit: string;
};

const NetWorkChart = (props: IProps) => {
  const { selectedUnit } = props;

  return (
    <Box   sx={{
      height: 560,
      overflow: "hidden",
      overflowY: "scroll",
    }}>
      <StatisticsAcordion selectedUnit={selectedUnit} />
    </Box>
  );
};

export default NetWorkChart;
