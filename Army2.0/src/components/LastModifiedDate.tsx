import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useQuery } from "react-query";

type IProps = {
  // accessToken: string;
  selectedUnit: string;
};
type LastModifiedDate = {
  time: Array<string>;
};

const LastModifiedDate = (props: IProps) => {
  const {  selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [dateArray, setDateArray] = useState<any>([]);

  const fetchFileLastModifiedDate = async (): Promise<LastModifiedDate> => {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/last-modified-date/${selectedUnit}`,
    );
    if (!res.ok) {
      console.log("error at fetching file last modified date");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<LastModifiedDate>(
    "FileLastModifiedDate",
    fetchFileLastModifiedDate,
    {
      onSuccess: (data) => {
        // console.log(data);

        setDateArray(data);
      },
    }
  );
  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" component="div">
            <Box display="inline"> תאריך עדכון אחרון: </Box>
            <Box sx={{ fontWeight: "bold" }} display="inline">
              {dateArray[0]}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="div">
            <Box display="inline"> בשעה: </Box>
            <Box sx={{ fontWeight: "bold" }} display="inline">
              {dateArray[1]}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
  //   return <>
  //   {dateArray}</>;
};

export default LastModifiedDate;
