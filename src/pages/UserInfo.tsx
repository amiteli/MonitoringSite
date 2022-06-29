// עמוד נתוני משתמש
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import UserControllerTable from "../components/UserControllerTable";
import { Navigate, useNavigate } from "react-router-dom";

interface IProps {
  accessToken: string;
  selectedUnit: string;
  controllerTable: any;
  controllerHeader: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const generalMachineTabList = [
  "TakashServer",
  "Kronot",
  "TakashRadio",
  "TakashHativa",
  "Platform",
  "Hamalim",
  "Other",
  "All",
];

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

const UserInfo = (props: IProps) => {
  const controllerTable = {
    asdf: [{ id: 0, שם: "asdf", מספר: 147, הראה: "true" }],
    qwer: [{ id: 0, שם: "qwer", מספר: 258, הראה: "true" }],
    zxcv: [{ id: 0, שם: "zxcv", מספר: 369, הראה: "false" }],
  };
  const controllerName: Array<string> = ["asdf", "qwer", "zxcv"];
  const controllerHeader = ["שם", "מספר", "הראה"];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper sx={{ bgcolor: "#f3f3f3", width: "85vw" }}>
        <Box>
          <Box sx={{ width: "100%", borderRadius: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                dir="rtl"
                centered
              >
                <Tab label='תק"שי שרתים' {...a11yProps(0)} />
                <Tab label="קרונות" {...a11yProps(1)} />
                <Tab label='תק"שי רדיו' {...a11yProps(2)} />
                <Tab label='תק"שי חטיבה' {...a11yProps(3)} />
                <Tab label="פלטפורמות" {...a11yProps(4)} />
                <Tab label="חמלים" {...a11yProps(5)} />
                <Tab label="אחרים" {...a11yProps(6)} />
                <Tab label="הכל" {...a11yProps(7)} />
              </Tabs>
            </Box>
            <Box dir="rtl">
              {generalMachineTabList &&
                generalMachineTabList.map((name, index) => {
                  return (
                    <TabPanel value={value} index={index}>
                      <Grid container direction="row">
                        <Grid item xs={12}>
                          <Box>
                            <UserControllerTable
                              controllerTable={controllerTable}
                              controllerHeader={controllerHeader}
                              name={controllerName[index]}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </TabPanel>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default UserInfo;
