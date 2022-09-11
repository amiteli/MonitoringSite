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
import { useNavigate } from "react-router-dom";
import { fetchData } from "./TokenController";

type IProps = {
  selectedUnit: string;
};
type oneMakmah = {
  "מזהה": string;
  "מיקום": string;
  "סטטוס": string;
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
  const navigate = useNavigate();
  const fetchMakmashKL = () =>
    fetchData("/RoipMonitoring/Units/matzov/KLstatistics", navigate);

  const { data, isLoading, isError } = useQuery<any>(
    "MakmashKl",
    fetchMakmashKL,
    {
      onSuccess: (data) => {
        setDataMakmash(data)
        console.log(dataMakmash)
      },
    }
  );

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;
  const makmashArr: string[] = [];
  dataMakmash.map((makmash: oneMakmah) => {
    makmashArr.push(makmash["מיקום"]);
  });
  const handleChange = (value: string[]) => {
    let arr: oneMakmah[] = [];
    dataMakmash.map((makmash: oneMakmah) => {
      if (value.includes(makmash["מיקום"])) {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mr: 3,
            ml: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ display: "inline", p: 1 }}>
            מזהה
          </Typography>
          <Typography variant="subtitle2" sx={{ display: "inline", p: 1 }}>
            מיקום
          </Typography>
          <Typography variant="subtitle2" sx={{ display: "inline", p: 1 }}>
            סטטוס
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
              return oneMakmash["סטטוס"] == "FAIL" ? (
                <ListItem
                  sx={{
                    color: "red",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash["מזהה"]}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash["מיקום"]}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                    {oneMakmash["סטטוס"]}
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
                  {oneMakmash["מזהה"]}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                  {oneMakmash["מיקום"]}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit">
                  {oneMakmash["סטטוס"]}
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
