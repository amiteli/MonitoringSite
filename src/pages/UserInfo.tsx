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
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const generalMachineTabList = [
  "All",
  "Other",
  "Hamalim",
  "Platform",
  "TakashHativa",
  "TakashRadio",
  "Kronot",
  "TakashServer",
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

const UserInfo = (props: Props) => {
  const navigate = useNavigate();

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
                dir="ltr"
              >
                <Tab label="הכל" {...a11yProps(0)} />
                <Tab label="אחרים" {...a11yProps(1)} />
                <Tab label="חמלים" {...a11yProps(2)} />
                <Tab label="פלטפורמות" {...a11yProps(3)} />
                <Tab label='תק"שי חטיבה' {...a11yProps(4)} />
                <Tab label='תק"שי רדיו' {...a11yProps(5)} />
                <Tab label="קרונות" {...a11yProps(6)} />
                <Tab label='תק"שי שרתים' {...a11yProps(7)} />
              </Tabs>
            </Box>

            {generalMachineTabList &&
              generalMachineTabList.map((name, index) => {
                return (
                  <TabPanel value={value} index={index}>
                    <Grid container direction="row">
                      <Grid item xs={12}>
                        <Box dir="ltr">
                          {/* <GeneralMachineTable /> */}
                          blabla jkgjkg hghg jgg
                        </Box>
                      </Grid>
                    </Grid>
                  </TabPanel>
                );
              })}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default UserInfo;
