import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import DoughuntChart from "./DoughnutChart";

//********** Type **********//
type IProps = { selectedUnit: string };
type dataParam = {
  id: number;
  state: string;
  number: number;
};
type arrayOfDataParam = {
  RcgwChartData: Array<dataParam>;
  MakmashimChartData: Array<dataParam>;
  CCUChartData: Array<dataParam>;
  CCTChartData: Array<dataParam>;
  YadbarChartData: Array<dataParam>;
  SoftwareDistributionServerChartData: Array<dataParam>;
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
      }/api/charts/rcgw-chart-data/${selectedUnit}`
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
          data?.MakmashimChartData.map((machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          });
        const MakmashimNumbersArray: Array<number> =
          data?.MakmashimChartData.map((machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          });
        setMakmashimDataStateArray({
          dataStateArray: MakmashimStatesArray,
          dataNumberArray: MakmashimNumbersArray,
          chartTitle: `מקמ"שים`,
        });
        const CCUStatesArray: Array<string> = data?.CCUChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const CCUNumbersArray: Array<number> = data?.CCUChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setCCUDataStateArray({
          dataStateArray: CCUStatesArray,
          dataNumberArray: CCUNumbersArray,
          chartTitle: `CCU`,
        });
        const CCTStatesArray: Array<string> = data?.CCTChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const CCTNumbersArray: Array<number> = data?.CCTChartData.map(
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
        const YadbarStatesArray: Array<string> = data?.YadbarChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const YadbarNumbersArray: Array<number> = data?.YadbarChartData.map(
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
          data?.SoftwareDistributionServerChartData.map(
            (machine: dataParam) => {
              if (data) {
                return machine.state;
              } else return "";
            }
          );
        const SoftwareDistributionServerNumbersArray: Array<number> =
          data?.SoftwareDistributionServerChartData.map(
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

  const donutsCharts = [
    <DoughuntChart
      labels={RcgwDataStateArray}
      data={RcgwDataNumberArray}
      chartTitle={RcgwChartTitle}
    />,
    <DoughuntChart
      labels={MakmashimDataArray}
      data={MakmashimNumberArray}
      chartTitle={MakmashimChartTitle}
    />,
    <DoughuntChart
      labels={CCUDataArray}
      data={CCUNumberArray}
      chartTitle={CCUChartTitle}
    />,
    <DoughuntChart
      labels={CCTDataArray}
      data={CCTNumberArray}
      chartTitle={CCTChartTitle}
    />,
    <DoughuntChart
      labels={YadbarDataArray}
      data={YadbarNumberArray}
      chartTitle={YadbarChartTitle}
    />,
    <DoughuntChart
      labels={SoftwareDistributionServerDataArray}
      data={SoftwareDistributionServerNumberArray}
      chartTitle={SoftwareDistributionServerChartTitle}
    />,
  ];
  const chartTitles = [
    RcgwChartTitle,
    MakmashimChartTitle,
    CCUChartTitle,
    CCTChartTitle,
    YadbarChartTitle,
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
      {/* פילוח תקינות רכיבים */}
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 30 }}
          paddingBottom={2}
          display="flex"
          justifyContent={"center"}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid xs={4} sm={4} md={4} key={index}>
              <Typography
                fontSize={19}
                fontWeight={700}
                textAlign={"center"}
                color={"black"}
                sx={{ position: "relative", top: "40%" }}
              >
                {chartTitles[index]}
              </Typography>
              {donutsCharts[index]}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DoughnutCharts;
