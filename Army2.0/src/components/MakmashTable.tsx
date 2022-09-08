import { ConstructionOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useSelector } from "react-redux";
import PureComponent from "./PureTable";
import { fetchData, getJwtToken, getRefreshToken, setJwtToken } from "../components/TokenController";
import { useNavigate } from "react-router-dom";


type IProps = {
  selectedUnit: string;
  table: string;
  headerName: string;
}

type Headers  = {
  RCGW_headers: Array<string>;
  CCU_headers: Array<string>;
  CCT_headers: Array<string>;
  Yadbar_headers: Array<string>;
  SDS_headers: Array<string>;
  Makmash_headers: Array<string>;
};
type rcgwParams = {
  ip?: string;
  state: string;
  בלהבלה?: string;
  עכד?: string;
  סוללה?: string;
};
type RadioParams = {
  שם?: string;
  ["שם משפחה"]?: string;
  עיר?: string;
  רחוב?: string;
  יחידה?: string;
  ["שם רכיב"]: string;
  id: string;
  מאזינים?: string | string[];
};

type RadioStatesIn = {
  deviceId: string;
  state: string;
  params: RadioParams;
};
type RadioStates = Array<RadioStatesIn>;

type RCGW = {
  deviceId: string;
  state: string;
  params: Array<rcgwParams>;
  radioStates: RadioStates;
};
type Other = {
  deviceId: string;
  state: string;
  params: Array<rcgwParams>;
};
type Data = any;



const MakmashTable = (props: IProps) => {
  const headerList: Headers = {
    "RCGW_headers": [
      "deviceId",
      "state",
      "CPU_USAGE",
      "IP",
      "LOCATION",
    ],
    "CCU_headers": [
      "deviceId",
      "state",
      "CPU_USAGE",
      "IP",
      "LOCATION"
    ],
    "CCT_headers": [
      "deviceId",
      "state",
      "CPU_USAGE",
      "IP",
      "LOCATION"
    ],
    "Yadbar_headers": [
      "deviceId",
      "state",
      "CPU_USAGE",
      "IP",
      "LOCATION"
    ],
    "SDS_headers": [
      "deviceId",
      "state",
      "CPU_USAGE",
      "LOCATION"
    ],
    "Makmash_headers": [
      "deviceId",
      "state",
      "RADIO",
      "FREQUENCY",
      "LISTENERS",
      "LOCATION",
    ]
  }
  const navigate = useNavigate()
  const { selectedUnit, table, headerName} = props;
  const [tableData, setTableData] = useState<RadioParams[]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);

  const fetchMakmash = () => fetchData('/RoipMonitoring/Units/matzov', navigate)

  const {
    data,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useQuery<Data>("FileData", fetchMakmash, {
    onSuccess: (data) => {
      let oneArray: any[] = [];
      if (table === "Makmash") {
        const sortRCGWData = data.RCGWs.map((machine: RCGW) => {
          if (machine.state !== null) {
            return machine.radioStates.map((device: RadioStatesIn) => {
              return device;
            });
          }
          return {};
        });
        sortRCGWData.map((array: any) => {
          return (oneArray = oneArray.concat(array));
        });
        
      }
      else {
        const sortData = data[table].map((machine: Other) => {
          if (machine.state !== null) {
            return machine;
          }
          return {};
        });
        sortData.map((array: any) => {
          return (oneArray = oneArray.concat(array));
        });
      }

      let newArray = oneArray.filter(
        (element) => Object.keys(element).length !== 0
      );
      setTableData(newArray)
    },
  });

    
  return <PureComponent rows={tableData} columns={tableHeader} />;
};
export default MakmashTable;
