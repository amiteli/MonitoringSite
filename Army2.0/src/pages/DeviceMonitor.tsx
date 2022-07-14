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

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PageHeader from "../components/PageHeader";
import InfoText from "../components/InfonText";

interface IProps {
  // username: string;
  // isAdmin: boolean;
  selectedUnit: string;
  tab: number
  // accessToken: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const deviceTableNameList = [
  "Makmash",
  "RCGW",
  "CCU",
  "CCT",
  "Yadbar",
  "SoftwareDistributionServer",
];

const deviceHeaderNameList = [
  "radio_state_headers",
  "RCGW_headers",
  "CCU_headers",
  "CCT_headers",
  "Yadbar_headers",
  "SoftwareDistributionServer_headers",
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
  "/device-monitor/Yashlakim",
  "/device-monitor/RadioServers",
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper elevation={0}>
          <Box>
            <Box>
              <PageHeader
                // username={username}
                // isAdmin={isAdmin}
                selectedUnit={selectedUnit}
                // accessToken={accessToken}
              />
            </Box>
            <Box
              sx={{
                width: "95%",
                border: "1px solid #e0e0e0",
                borderRadius: 4,
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  dir="rtl"
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
            <Stack direction="row" spacing={5} justifyContent="center">
              <Button
                variant="contained"
                onClick={handleClick}
                size="large"
                sx={{ margin: 5, px: 7 }}
              >
                חזור
              </Button>
            </Stack>
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default DevicesTablePage;
