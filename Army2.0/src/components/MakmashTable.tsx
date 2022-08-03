import { Box } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useSelector } from "react-redux";
import PureComponent from "./PureTable";

interface IProps {
  // accessToken: string;
  selectedUnit: string;
  table: string;
  headerName: string;
}

type Headers = {
  RCGW_headers: Array<string>;
  CCU_headers: Array<string>;
  CCT_headers: Array<string>;
  Yadbar_headers: Array<string>;
  SoftwareDistributionServer_headers: Array<string>;
  radio_state_headers: Array<string>;
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
  const { selectedUnit, table, headerName } = props;
  const [tableData, setTableData] = useState<RadioParams[]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);
  const [errorText, setErrorText] = useState(" ");


  const fetchRadioStates = async (): Promise<Data> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/radioStates/${selectedUnit}`
      );
      if (!res.ok) {
        // console.log("error at fetching radioStates");
        setErrorText(
          `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
        );
        throw new Error("Problem fetching data");
      }
      // console.log(res);
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHeaderList = async (): Promise<Headers> => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/headerList`);
    if (!res.ok) {
      console.log("error at fetching headerList");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      console.log(res.status, res.statusText, res.url);

      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const {
    data,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useQuery<Data>("FileData", fetchRadioStates, {
    onSuccess: (data) => {
      const { RCGW } = data ?? {
        RCGW: [],
      };
      // console.log(data);
      let oneArray: any[] = [];
      if (table === "Makmash") {
        const sortRCGWData = data.RCGW.map((machine: RCGW) => {
          if (machine.state !== "FAILED") {
            return machine.radioStates.map((device: RadioStatesIn) => {
              if (device.state !== "FAILED") return device.params;
              return {};
            });
          }
          return {};
        });
        sortRCGWData.map((array: any) => {
          return (oneArray = oneArray.concat(array));
        });
      } else {
        const sortData = data[table].map((machine: Other) => {
          if (machine.state !== "FAILED") {
            return machine.params;
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
      setTableData(newArray);
    },
  });

  const { isLoading: isLoadingHeader, isError: isErrorHeader } =
    useQuery<Headers>("FileHeader", fetchHeaderList, {
      onSuccess: (headerData: any) => {
        // const { param_headers, radio_state_headers } = headerData ?? {
        //   param_headers: [],
        //   radio_state_headers: [],
        // };
        // if (table === "Makmash") {
        // console.log(headerData);
        setTableHeader(headerData[headerName]);
        
        
        // setFilterModel({
        //   items: [
        //     {
        //       columnField: `${columnField}`,
        //       operatorValue: "contains",
        //       value: `${value}`,
        //     },
        //   ],
        // })

        // } else {
        //   setTableHeader(param_headers);
        // }
      },
    });

  if (isLoadingData || isLoadingHeader) return <>"Loading..."</>;

  if (isErrorHeader || isErrorData)
    return <>"An error has occurred: " {errorText}</>;
    // filterModel={filterModel} setFilterModel={setFilterModel}
  return <PureComponent rows={tableData} columns={tableHeader} />;
};
export default MakmashTable;
