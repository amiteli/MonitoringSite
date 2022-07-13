// טבלת השליטה בעמוד הראשי

import { Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PureComponent from "./PureTable";

interface IProps {
  //   accessToken: string;
  //   selectedUnit: string;
  controllerTable: any;
  controllerHeader: any;
  info: any;
  setInfo: any;
  name: string;
}

const UserControllerTable = (props: IProps) => {
  const { controllerTable, controllerHeader, info, setInfo, name } = props;
  const [selectedUserId, setSelectedUserID] = useState();
  console.log(controllerTable);
  return (
    <Box>
      <PureComponent
        // rows={controllerTable}
        columns={controllerHeader}
        info={info}
        setInfo={setInfo}
        name={name}
      />
    </Box>
  );
};

export default UserControllerTable;
