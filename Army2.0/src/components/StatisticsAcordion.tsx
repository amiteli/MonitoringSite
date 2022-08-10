import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Autocomplete,
  Avatar,
  createFilterOptions,
  createStyles,
  createTheme,
  Dialog,
  Divider,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "react-query";
import { useState } from "react";
import OneStation from "./OneStation";
import { ThemeProvider } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { Box, fontWeight } from "@mui/system";
import Grid from "@mui/material/Grid";
import rtlPlugin from "stylis-plugin-rtl";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { setOptions } from "react-chartjs-2/dist/utils";
import { renderProgress } from "./ProgressBarTableCell";


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
type DataBlocks = {
  Networks: Array<Network>;
};
type NetworkDataParam = {
  id: number;
  network: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};
type Network = {
  network: any;
  OK: number;
  ERROR: number;
  FAILED: number;
};
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: any) => option,
});
const StatisticsAcordion = (props: IProps) => {
  const { selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

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
    "NetworkChartData",
    fetchNetworkData,
    {
      onSuccess: (data) => {
        let dataNetworkHeader = data.NetworkChartData;
        let tempArr: any = [];
        dataNetworkHeader.map((element: any, index: number) => {
          let obj: NetworkDataParam = {
            id: element.id,
            network: element.network,
            FAILED: element.FAILED,
            OK: element.OK,
            ERROR: element.ERROR,
          };
          tempArr.push(obj);
        });
        setHeadersName(tempArr);
      },
    }
  );
  const networks = [];
  networks.push(
    headersName.map((header:any) => {
      return header.network;
    })
  );

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Autocomplete
            multiple
            size="small"
            id="filter-networks"
            options={networks[0]}
            getOptionLabel={(option) => option}
            filterOptions={filterOptions}
            sx={{ width: 300, m: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="סנן רשתות" />
            )}
          />
        </ThemeProvider>
      </CacheProvider>
      {headersName &&
        headersName.map((header: any, index) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content ${index}`}
                id={`panel-content ${index} header`}
              >
                <Grid container direction="row">
                  <Grid item xs>
                    <Typography>{header.network}</Typography>
                  </Grid>
                    <Typography color={"secondary.main"} fontWeight={"bold"} paddingLeft={2}>
                      {header.OK + header.ERROR + header.FAILED} / 
                      <Typography
                        display={"inline-flex"}
                        color={"success.main"}
                        fontWeight={"bold"}
                      >
                         {header.OK}
                      </Typography>
                    </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row">
                
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export default StatisticsAcordion;
