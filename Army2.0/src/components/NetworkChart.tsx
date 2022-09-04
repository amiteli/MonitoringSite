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

  return <StatisticsAcordion selectedUnit={selectedUnit} />;
};

export default NetWorkChart;
