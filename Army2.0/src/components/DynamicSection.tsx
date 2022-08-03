import { Grid, Paper } from "@mui/material";

import { useState } from "react";
import { useQuery } from "react-query";
import MultiCheckBoxSelect from "./MultiCheckBoxSelect";

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
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={5} md={2.5} sx={{ p: 1, ml:2 }}>
            <MultiCheckBoxSelect stationsData={stationsData} title="צפון" />
          </Grid>
          <Grid item xs={5} md={2.5} sx={{ p: 1, ml:2 }}>
            <MultiCheckBoxSelect stationsData={stationsData} title="דרום" />
          </Grid>
          <Grid item xs={5} md={2.5} sx={{ p: 1, ml:2}}>
            <MultiCheckBoxSelect stationsData={stationsData} title="מזרח" />
          </Grid>
          <Grid item xs={5} md={2.5} sx={{ p: 1, ml:2 }}>
            <MultiCheckBoxSelect stationsData={stationsData} title="מערב" />
          </Grid>
        </Grid>

    </>
  );
};

export default DynamicSection;
