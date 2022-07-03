// טבלת השליטה בעמוד הראשי

import { Box } from "@mui/material";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

interface IProps {
  //   accessToken: string;
  //   selectedUnit: string;
  controllerTable: any;
  controllerHeader: any;
  name: string;
  checked: boolean[];
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const UserControllerTable = (props: IProps) => {
  const { controllerTable, controllerHeader, name, checked, setChecked } =
    props;

  return (
    <Box>
      <PureComponent
        rows={controllerTable[name]}
        columns={controllerHeader}
        checked={checked}
        setChecked={setChecked}
      />
    </Box>
  );
};

export default UserControllerTable;
