// טבלת השליטה בעמוד הראשי

import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

interface IProps {
  //   accessToken: string;
  //   selectedUnit: string;
  controllerTable: any;
  controllerHeader: any;
  name: string;
}

const UserControllerTable = (props: IProps) => {
  const { controllerTable, controllerHeader, name } = props;

  return (
    <Box>
      <PureComponent rows={controllerTable[name]} columns={controllerHeader} />
    </Box>
  );
};

export default UserControllerTable;
