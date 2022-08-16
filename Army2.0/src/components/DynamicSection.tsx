import { Box, Grid, Input, InputLabel, Paper, TextField } from "@mui/material";

import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useQuery } from "react-query";
import MultiCheckBoxSelect from "./MultiCheckBoxSelect";
import { styled } from "@mui/material/styles";
type IProps = { selectedUnit: string };

type dataParam = {
  id: number;
  location: string;
  network: string | null;
  status: Status;
};

type Status = {
  OK: number;
  ERROR: number;
  FAILED: number;
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // borderRight: "2px solid black",
  // borderLeft: "2px solid black",
  // borderBottom: "2px solid primary.main",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  color: theme.palette.text.secondary,
}));
const DynamicSection = (props: IProps) => {
  const { selectedUnit } = props;

  const [errorText, setErrorText] = useState(" ");
  const [stationsData, setStationsData] = useState<Array<dataParam>>([]);

  const fetchChartsData = async (): Promise<any> => {
    console.log("fetchChartsData");
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

  const { data, isLoading, isError } = useQuery<any>(
    "LocationCharts",
    fetchChartsData,
    {
      onSuccess: (data) => {
        setStationsData(data?.LocationBasedChart);
      },
    }
  );

  if (isLoading) return <>"Loading..."</>;
  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <Box sx={{ width: "100%"}}>
        <Grid container >
          <Grid item xs={3}>
          <MultiCheckBoxSelect stationsData={stationsData} title="צפון" />
          </Grid>
          <Grid item xs={3}>
            <MultiCheckBoxSelect stationsData={stationsData} title="דרום" />
          </Grid>
          <Grid item xs={3}>
            <MultiCheckBoxSelect stationsData={stationsData} title="מזרח" />
          </Grid>
          <Grid item xs={3}>
            <MultiCheckBoxSelect stationsData={stationsData} title="מערב" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DynamicSection;
