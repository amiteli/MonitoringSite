import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
  Switch,
} from "@mui/material";
import React from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import MakmashTable from "../components/MakmashTable";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PageHeader from "../components/PageHeader";
import InfoText from "../components/InfonText";

interface IProps {
  // username: string;
  // isAdmin: boolean;
  selectedUnit: string;
  tab: number;
  // accessToken: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const useStyles = makeStyles({
  tabs: {
    "& .MuiTab-root":{
      color:"white"
    },
    "& .MuiTab-root.Mui-selected": {
      fontWeight:"bold",
      fontSize:"1.02rem",
      color:"#f0bc5e"
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
});
const deviceTableNameList = [
  "Makmash",
  "RCGWs",
  "CCUs",
  "CCTs",
  "UVTs",
  "SDSs",
];

const deviceHeaderNameList = [
  "Makmash_headers",
  "RCGW_headers",
  "CCU_headers",
  "CCT_headers",
  "Yadbar_headers",
  "SDS_headers",
];

const theme = createTheme({
  palette: {
    secondary: {
      main: "rgba(75, 192, 192, 1)",
    },
    error: {
      main: "rgba(255, 99, 132, 1)",
    },
  },
});

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const paths = [
  "/device-monitor/Makmashim",
  "/device-monitor/RCGW",
  "/device-monitor/CCU",
  "/device-monitor/CCT",
  "/device-monitor/Yadbar",
  "/device-monitor/Deploy",
];

const DevicesTablePage = (props: IProps) => {
  const { selectedUnit, tab } = props;

  const navigate = useNavigate();

  const [value, setValue] = React.useState(tab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(paths[newValue]);
  };

  const handleClick = (): void => {
    navigate("/show-by-page");
  };
  const tabsPanelStyle = useStyles();
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
              <Box>
                {/* <PageHeader
                  // username={username}
                  // isAdmin={isAdmin}
                  selectedUnit={selectedUnit}
                  // accessToken={accessToken}
                /> */}
                <Box
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 4,
                  }}
                >
                  <Box sx={{ borderBottom: 1, borderColor: "divider",borderTopLeftRadius: 4,borderTopRightRadius:4,
                    backgroundColor:"#2e3b55"}}>
                    <Tabs
                      className={tabsPanelStyle.tabs}
                      value={value}
                      onChange={handleChange}
                      aria-label="secondary tabs example"
                      dir="rtl"
                      centered
                    >
                      <Tab label='מקמ"שים' {...a11yProps(0)} />
                      <Tab label='ישל"קים' {...a11yProps(1)} />
                      <Tab label="שרתי רדיו" {...a11yProps(2)} />
                      <Tab label="עמדות CCT" {...a11yProps(3)} />
                      <Tab label='ידב"רים' {...a11yProps(4)} />
                      <Tab label="שרתי הפצה" {...a11yProps(5)} />
                    </Tabs>
                  </Box>

                  {deviceTableNameList &&
                    deviceTableNameList.map((deviceName, index) => {
                      return (
                        <TabPanel value={value} index={index}>
                          <MakmashTable
                            // accessToken={accessToken}
                            selectedUnit={selectedUnit}
                            table={deviceName}
                            headerName={deviceHeaderNameList[value]}
                          />
                        </TabPanel>
                      );
                    })}
                </Box>
                <ReactQueryDevtools initialIsOpen={false} />
              </Box>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default DevicesTablePage;
