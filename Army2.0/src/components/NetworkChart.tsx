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
      height:"100%",
      overflow: "hidden",
      overflowY: "scroll",
      '&::-webkit-scrollbar': {
        width: '0.4em',  
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#2e3b55',
        borderRadius:5,
        maxHeight:2
      },
    }}>
      <StatisticsAcordion selectedUnit={selectedUnit} />
    </Box>
  );
};

export default NetWorkChart;
