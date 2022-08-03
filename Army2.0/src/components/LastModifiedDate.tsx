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
  const { selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [dateArray, setDateArray] = useState<any>([]);

  const fetchFileLastModifiedDate = async (): Promise<LastModifiedDate> => {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/last-modified-date/${selectedUnit}`
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
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "600px",
        fontSize: "16px",
        marginBottom: "6px",
      }}
    >
      תאריך עדכון אחרון: <b>{dateArray[0]}</b>      בשעה: <b>{dateArray[1]}</b>
    </Box>
  );
  //   return <>
  //   {dateArray}</>;
};

export default LastModifiedDate;
