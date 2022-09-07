import {
  Autocomplete,
  List,
  ListItem,
  TextField,
  Typography,
  createTheme,
  Box,
} from "@mui/material";
import { Button, ThemeProvider } from "react-bootstrap";
import React, { useState } from "react";
import { useQuery } from "react-query";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

type IProps = {
  selectedUnit: string;
};
type oneMakmah = {
  deviceId: string;
  location: string;
  status: string;
};
const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const MakmashKl = (props: IProps) => {
  const { selectedUnit } = props;
  const [errorText, setErrorText] = useState<string>();
  const [dataMakmashKl, setDataMakmashKl] = useState<Array<oneMakmah>>([]);
  const [dataMakmash, setDataMakmash] = useState<Array<oneMakmah>>([]);
  const [value, setValue] = useState<string[]>();

  const fetchNetworkData = async (): Promise<any> => {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/charts/rcgw-chart-data/${selectedUnit}`
    );
    if (!res.ok) {
      console.log("error at fetching headerList");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );

      throw new Error("Problem fetching data at fetchUnitDevicesData function");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<any>(
    "MakmashKl",
    fetchNetworkData,
    {
      onSuccess: (data) => {
        setDataMakmash(data.MakmashKl);
      },
    }
  );

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;
  const makmashArr: string[] = [];
  dataMakmash.map((makmash: oneMakmah) => {
    makmashArr.push(makmash.location);
  });
  const handleChange = (value: string[]) => {
    let arr: oneMakmah[] = [];
    dataMakmash.map((makmash: oneMakmah) => {
      if (value.includes(makmash.location)) {
        arr.push(makmash);
      }
    });
    setDataMakmashKl(arr);
  };
  return (
    <>
      <Box top={0} sx={{ position: "relative" }}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              value={value}
              multiple
              limitTags={2}
              size="small"
              id="filter-networks"
              options={makmashArr}
              sx={{ width: "80%", m: "0 auto", mt: 2, mb: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="סנן מיקומים" />
              )}
              disableCloseOnSelect
              onChange={(event, value) => handleChange(value)}
            />
          </ThemeProvider>
        </CacheProvider>
        <Box sx={{ display: "flex", justifyContent: "space-between",mr:3,ml:3 }}>
          <Typography variant="subtitle2" sx={{ display: "inline", p: 1 }}>
            מזהה
          </Typography>
          <Typography variant="subtitle2" sx={{ display: "inline", p: 1 }}>
            מיקום
          </Typography>
          <Typography variant="subtitle2" sx={{ display: "inline", p: 1 }}>
            מצב
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: "70vh",
          overflow: "hidden",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2e3b55",
            borderRadius: 5,
            maxHeight: 2,
          },
        }}
      >
        <List>
          {(dataMakmashKl.length == 0 ? dataMakmash : dataMakmashKl).map(
            (oneMakmash: oneMakmah) => {
              return oneMakmash.status == "לא תקין" ? (
                <ListItem
                  sx={{
                    color: "red",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash.deviceId}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash.location}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash.status}
                  </Typography>
                </ListItem>
              ) : (
                <ListItem
                  sx={{
                    color: "green",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash.deviceId}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash.location}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash.status}
                  </Typography>
                </ListItem>
              );
            }
          )}
        </List>
      </Box>
    </>
  );
};

export default MakmashKl;
