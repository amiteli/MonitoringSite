import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import DoughuntChart from "./DoughnutChart";
import { getJwtToken } from "./TokenController";

//********** Type **********//
type IProps = { selectedUnit: string };
type dataParam = {
  id: number;
  state: string;
  number: number;
};
type arrayOfDataParam = {
  RcgwChartData: Array<dataParam>;
  RadioStateChartData: Array<dataParam>;
  CcuChartData: Array<dataParam>;
  CctChartData: Array<dataParam>;
  UvtChartData: Array<dataParam>;
  SdsChartData: Array<dataParam>;
};
type RcgwDataObject = {
  dataStateArray: Array<string>;
  dataNumberArray: Array<number>;
  chartTitle: string;
};

//********** Component **********//
const DoughnutCharts = (props: IProps) => {
  const { selectedUnit } = props;
  //********** States Of Data Of Charts **********//
  const [errorText, setErrorText] = useState(" ");
  const [RcgwDataArrays, setRcgwDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: "",
  });
  const [MakmashimDataArrays, setMakmashimDataStateArray] =
    useState<RcgwDataObject>({
      dataStateArray: [],
      dataNumberArray: [],
      chartTitle: "",
    });
  const [CCUDataArrays, setCCUDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: "",
  });
  const [CCTDataArrays, setCCTDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: "",
  });
  const [YadbarDataArrays, setYadbarDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: "",
  });
  const [
    SoftwareDistributionServerDataArrays,
    setSoftwareDistributionServerDataStateArray,
  ] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: " ",
  });
  const fetchChartsData = async (): Promise<arrayOfDataParam> => {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/RoipMonitoring/Units/matzov/statistics`,
      {
        headers: { authorization: "Bearer " + getJwtToken() },
      }
    );
    if (!res.ok) {
      console.log("error at fetching rcgw-chart-data");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<arrayOfDataParam>(
    "rcgwChartData",
    fetchChartsData,
    {
      onSuccess: (data) => {
        const statesArray: Array<string> = data?.RcgwChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const numbersArray: Array<number> = data?.RcgwChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setRcgwDataStateArray({
          dataStateArray: statesArray,
          dataNumberArray: numbersArray,
          chartTitle: `ישלק"ים`,
        });
        const MakmashimStatesArray: Array<string> =
          data?.RadioStateChartData.map((machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          });
        const MakmashimNumbersArray: Array<number> =
          data?.RadioStateChartData.map((machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          });
        setMakmashimDataStateArray({
          dataStateArray: MakmashimStatesArray,
          dataNumberArray: MakmashimNumbersArray,
          chartTitle: `מקמ"שים`,
        });
        // const CCUStatesArray: Array<string> = data?.CcuChartData.map(
        //   (machine: dataParam) => {
        //     if (data) {
        //       return machine.state;
        //     } else return "";
        //   }
        // );
        // const CCUNumbersArray: Array<number> = data?.CcuChartData.map(
        //   (machine: dataParam) => {
        //     if (data) {
        //       return machine.number;
        //     } else return 0;
        //   }
        // );
        // setCCUDataStateArray({
        //   dataStateArray: CCUStatesArray,
        //   dataNumberArray: CCUNumbersArray,
        //   chartTitle: `CCU`,
        // });
        const CCTStatesArray: Array<string> = data?.CctChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const CCTNumbersArray: Array<number> = data?.CctChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setCCTDataStateArray({
          dataStateArray: CCTStatesArray,
          dataNumberArray: CCTNumbersArray,
          chartTitle: `CCT`,
        });
        const YadbarStatesArray: Array<string> = data?.UvtChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const YadbarNumbersArray: Array<number> = data?.UvtChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setYadbarDataStateArray({
          dataStateArray: YadbarStatesArray,
          dataNumberArray: YadbarNumbersArray,
          chartTitle: `ידב"רים`,
        });
        const SoftwareDistributionServerStatesArray: Array<string> =
          data?.SdsChartData.map(
            (machine: dataParam) => {
              if (data) {
                return machine.state;
              } else return "";
            }
          );
        const SoftwareDistributionServerNumbersArray: Array<number> =
          data?.SdsChartData.map(
            (machine: dataParam) => {
              if (data) {
                return machine.number;
              } else return 0;
            }
          );
        setSoftwareDistributionServerDataStateArray({
          dataStateArray: SoftwareDistributionServerStatesArray,
          dataNumberArray: SoftwareDistributionServerNumbersArray,
          chartTitle: `שרת הפצה`,
        });
      },
    }
  );
  const {
    dataStateArray: RcgwDataStateArray,
    dataNumberArray: RcgwDataNumberArray,
    chartTitle: RcgwChartTitle,
  } = RcgwDataArrays;
  const {
    dataStateArray: MakmashimDataArray,
    dataNumberArray: MakmashimNumberArray,
    chartTitle: MakmashimChartTitle,
  } = MakmashimDataArrays;
  const {
    dataStateArray: CCUDataArray,
    dataNumberArray: CCUNumberArray,
    chartTitle: CCUChartTitle,
  } = CCUDataArrays;
  const {
    dataStateArray: CCTDataArray,
    dataNumberArray: CCTNumberArray,
    chartTitle: CCTChartTitle,
  } = CCTDataArrays;
  const {
    dataStateArray: YadbarDataArray,
    dataNumberArray: YadbarNumberArray,
    chartTitle: YadbarChartTitle,
  } = YadbarDataArrays;
  const {
    dataStateArray: SoftwareDistributionServerDataArray,
    dataNumberArray: SoftwareDistributionServerNumberArray,
    chartTitle: SoftwareDistributionServerChartTitle,
  } = SoftwareDistributionServerDataArrays;

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  const donutsCharts: any = {
    
    RCGW: (
      <DoughuntChart
        labels={RcgwDataStateArray}
        data={RcgwDataNumberArray}
        chartTitle={RcgwChartTitle}
      />
    ),
    Makmash: (
      <DoughuntChart
        labels={MakmashimDataArray}
        data={MakmashimNumberArray}
        chartTitle={MakmashimChartTitle}
      />
    ),
    Yadbar: (
      <DoughuntChart
        labels={YadbarDataArray}
        data={YadbarNumberArray}
        chartTitle={YadbarChartTitle}
      />
    ),
    CCU: (
      <DoughuntChart
        labels={CCUDataArray}
        data={CCUNumberArray}
        chartTitle={CCUChartTitle}
      />
    ),

    CCT: (
      <DoughuntChart
        labels={CCTDataArray}
        data={CCTNumberArray}
        chartTitle={CCTChartTitle}
      />
    ),

    Deploy: (
      <DoughuntChart
        labels={SoftwareDistributionServerDataArray}
        data={SoftwareDistributionServerNumberArray}
        chartTitle={SoftwareDistributionServerChartTitle}
      />
    ),
  };
  const chartTitles = [
    RcgwChartTitle,
    MakmashimChartTitle,
    YadbarChartTitle,
    CCUChartTitle,
    CCTChartTitle,
    SoftwareDistributionServerChartTitle,
  ];
  // RCGW:"#FF1E56",
  // Makmash:"#323232",
  // CCU:"#293A80",
  // CCT:"#D65A31",
  // Yadbar:"#D72323",
  // Deploy:"#62A388"
  const colorChartTiltle = [
    "#FF1E56",
    "#323232",
    "#293A80",
    "#D65A31",
    "#D72323",
    "#62A388",
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={3}>
            {donutsCharts.RCGW}
          </Grid>
          <Grid item xs={3}>
            {donutsCharts.Makmash}
          </Grid>
          <Grid item xs={3}>
            {donutsCharts.Yadbar}
          </Grid>
          <Grid item xs={3}>
            {donutsCharts.CCT}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DoughnutCharts;
