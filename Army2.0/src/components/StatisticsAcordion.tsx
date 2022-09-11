import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  createTheme,
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "react-query";
import { useState } from "react";
import { Button, ThemeProvider } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import rtlPlugin from "stylis-plugin-rtl";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "../redux/filterTable";
import { Box } from "@mui/system";
import { fetchData } from "./TokenController";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

type IProps = {
  selectedUnit: string;
};
type HeaderParam = {
  network: string;
  OK: number;
  Fail: number;
  devicesLength: number;
  devices: Array<DetailParam>;
};
type DetailParam = {
  מזהה: string;
  מיקום: string;
  סטטוס: string;
};

const StatisticsAcordion = (props: IProps) => {
  const { selectedUnit } = props;
  const [errorText, setErrorText] = useState<string>();
  const [headersName, setHeadersName] = useState<Array<HeaderParam>>([]);
  const [headers, setHeaders] = useState<Array<HeaderParam>>([]);
  const [value, setValue] = useState<string[]>();

  function tooltip(fail: number, ok: number) {
    return (
      <>
        <Typography variant="subtitle2" color={"#FFB1C1"}>
          {fail} תקולים
        </Typography>
        <Typography variant="subtitle2" color={"#A5DFDF"}>
          {ok} תקינים
        </Typography>
      </>
    );
  }
  const selectColor = (number: number) => {
    if (number < 50) return "linear-gradient(to right, #ff416c, #ff4b2b)";
    else if (number >= 50 && number <= 85)
      return "linear-gradient(to right, #f7971e, #ffd200)";
    else return "linear-gradient(to right, #56ab2f, #a8e063)";
  };
  const precentsBar = (precents: number) => {
    return (
      <Grid
        container
        style={{
          border: "2px solid black",
          position: "relative",
          overflow: "hidden",
          width: "20%",
          height: 26,
          borderRadius: 3,
          marginLeft: 5,
        }}
      >
        <Grid
          item
          style={{
            position: "absolute",
            lineHeight: "25px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {`${precents.toFixed(0)}%`}
        </Grid>
        <Grid
          item
          width={precents + "%"}
          style={{
            background: selectColor(precents),
          }}
        ></Grid>
      </Grid>
    );
  };
  const fetchNetworkData = () =>
    fetchData("/RoipMonitoring/Units/matzov/networkStatistics", navigate);

  const { data, isLoading, isError } = useQuery<any>(
    "NetworkChartData",
    fetchNetworkData,
    {
      onSuccess: (data) => {
        let dataNetwork = data;
        let tempArr: HeaderParam[] = [];
        dataNetwork.map((element: any, index: number) => {
          let obj: HeaderParam = {
            network: element.network,
            OK: element.statusNetwork.OK,
            Fail: element.statusNetwork.FAILED,
            devicesLength: element.devices.length,
            devices: element.devices.map(
              (device: DetailParam, index: number) => {
                return device;
              }
            ),
          };
          tempArr.push(obj);
        });
        setHeaders(tempArr);
      },
    }
  );
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const networks: string[] = [];
  headers.map((header: HeaderParam) => {
    networks.push(header.network);
  });
  const handleChange = (value: string[]) => {
    let arr: HeaderParam[] = [];
    headers.map((header: HeaderParam) => {
      if (value.includes(header.network)) {
        arr.push(header);
      }
    });
    setHeadersName(arr);
  };

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  const navigateToTable = (device: string, location: string) => {
    const columnField = "שם רשת";
    const operatorValue = "contains";
    const value = location;
    dispatch(setData({ columnField, operatorValue, value }));
    navigate(`/device-monitor/${device}`);
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
              options={networks}
              sx={{ width: "60%", m: "0 auto", mt: 2, mb: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="סנן רשתות" />
              )}
              disableCloseOnSelect
              onChange={(event, value) => handleChange(value)}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={14} sx={{ display: "inline", p: 1 }}>
                הצג בניטור מפורט
              </Typography>
              <Typography fontSize={14} sx={{ display: "inline", p: 1 }}>
                שם רשת
              </Typography>
              <Typography fontSize={14} sx={{ display: "inline", p: 1 }}>
                כמות מקמ"שים תקינים לרשת
              </Typography>
            </Box>
          </ThemeProvider>
        </CacheProvider>
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
        {(headersName.length == 0 ? headers : headersName).map(
          (header: HeaderParam, index: number) => {
            let precents = (header.OK / header.devicesLength) * 100;
            return (
              <Accordion>
                <AccordionSummary
                  sx={{ pl: 2, pr: 5 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-content ${index}`}
                  id={`panel-content ${index} header`}
                >
                  <Grid container direction="row">
                    <IconButton sx={{ p: 0 }}>
                      <RemoveRedEyeIcon
                        onClick={() =>
                          navigateToTable("Makmashim", header.network)
                        }
                      />
                    </IconButton>
                    <Grid item xs>
                      <Typography fontWeight={"bold"}>
                        {header.network}
                      </Typography>
                    </Grid>

                    <Tooltip title={tooltip(header.Fail, header.OK)}>
                      {header.devicesLength == 0
                        ? precentsBar(0)
                        : precentsBar(precents)}
                    </Tooltip>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ m: 0, display: "flex", justifyContent: "space-around" }}
                >
                  <List sx={{ p: 0 }}>
                    <Divider>תקולים</Divider>
                    {header.OK == header.devices.length ? (
                      <ListItem
                        sx={{
                          p: 0,
                          color: "initial",
                          fontWeight: "bold",
                          width: "179px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        אין כלים תקולים
                      </ListItem>
                    ) : (
                      header.devices.map(
                        (device: DetailParam, index: number) => {
                          if (device["סטטוס"] == "FAILED") {
                            return (
                              <ListItem
                                sx={{
                                  p: 0,
                                  color: "#FF6384",
                                  fontWeight: "bold",
                                }}
                              >
                                {device["מזהה"]} - {device["מיקום"]}
                              </ListItem>
                            );
                          }
                        }
                      )
                    )}
                  </List>
                  <List sx={{ p: 0 }}>
                    <Divider>תקינים</Divider>
                    {header.Fail == header.devices.length ? (
                      <ListItem
                        sx={{
                          p: 0,
                          color: "initial",
                          fontWeight: "bold",
                          width: "179px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        אין כלים תקינים
                      </ListItem>
                    ) : (
                      header.devices.map(
                        (device: DetailParam, index: number) => {
                          if (device["סטטוס"] !== "FAILED") {
                            return (
                              <ListItem
                                sx={{
                                  p: 0,
                                  color: "success.main",
                                  fontWeight: "bold",
                                }}
                              >
                                {device["מזהה"]} - {device["מיקום"]}
                              </ListItem>
                            );
                          }
                        }
                      )
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          }
        )}
      </Box>
    </>
  );
};

export default StatisticsAcordion;
