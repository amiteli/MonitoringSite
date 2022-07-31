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
import { useState } from "react";
import UserControllerTable from "../components/UserControllerTable";
import { Navigate, useNavigate } from "react-router-dom";

interface IProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const generalMachineTabList: Array<string> = [
  "TakashServer",
  "Kronot",
  "TakashRadio",
  "TakashHativa",
  "Platform",
  "Hamalim",
  "Other",
  "All",
];

const generalTabList: Array<string> = [
  'תק"שי שרתים',
  "קרונות",
  'תק"שי רדיו',
  'תק"שי חטיבה',
  "פלטפורמות",
  "חמלים",
  "אחרים",
  "הכל",
];

const header = ["id", "שם", "מספר", "הראה1", "הראה2", "הראה3"];

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
  const [value, setValue] = React.useState(0);

  const [info, setInfo]: any = useState({
    TakashServer: [
      {
        id: "0",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: true,
        הראה3: true,
      },
      {
        id: "1",
        שם: "qwer",
        מספר: "258",
        הראה1: true,
        הראה2: true,
        הראה3: false,
      },
      {
        id: "2",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: false,
        הראה3: true,
      },
    ],
    Kronot: [
      {
        id: "0",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: true,
        הראה3: true,
      },
      {
        id: "1",
        שם: "qwer",
        מספר: "258",
        הראה1: true,
        הראה2: true,
        הראה3: false,
      },
      {
        id: "2",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: false,
        הראה3: true,
      },
    ],
    Platform: [
      {
        id: "0",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: true,
        הראה3: true,
      },
      {
        id: "1",
        שם: "qwer",
        מספר: "258",
        הראה1: true,
        הראה2: true,
        הראה3: false,
      },
      {
        id: "2",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: false,
        הראה3: true,
      },
    ],
    Hamalim: [
      {
        id: "0",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: true,
        הראה3: true,
      },
      {
        id: "1",
        שם: "qwer",
        מספר: "258",
        הראה1: true,
        הראה2: true,
        הראה3: false,
      },
      {
        id: "2",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: false,
        הראה3: true,
      },
    ],
    Other: [
      {
        id: "0",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: true,
        הראה3: true,
      },
      {
        id: "1",
        שם: "qwer",
        מספר: "258",
        הראה1: true,
        הראה2: true,
        הראה3: false,
      },
      {
        id: "2",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: false,
        הראה3: true,
      },
    ],
    All: [
      {
        id: "0",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: true,
        הראה3: true,
      },
      {
        id: "1",
        שם: "qwer",
        מספר: "258",
        הראה1: true,
        הראה2: true,
        הראה3: false,
      },
      {
        id: "2",
        שם: "zxcv",
        מספר: "369",
        הראה1: false,
        הראה2: false,
        הראה3: true,
      },
    ],
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // console.log(info);
  return (
    <>
      <Paper sx={{ bgcolor: "#f3f3f3" }}>
        <Box>
          <Box sx={{ width: "100%", borderRadius: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                dir="rtl"
                centered
              >
                {/* {generalTabList &&
                  generalTabList.map((name, index) => {
                    <Tab label={name} {...a11yProps(index)} />;
                  })} */}
                <Tab
                  label='תק"שי שרתים'
                  {...a11yProps(0)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label="קרונות"
                  {...a11yProps(1)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label='תק"שי רדיו'
                  {...a11yProps(2)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label='תק"שי חטיבה'
                  {...a11yProps(3)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label="פלטפורמות"
                  {...a11yProps(4)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label="חמלים"
                  {...a11yProps(5)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label="אחרים"
                  {...a11yProps(6)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
                <Tab
                  label="הכל"
                  {...a11yProps(7)}
                  sx={{ marginLeft: 3, marginRight: 3 }}
                />
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
                              columns={header}
                              info={info}
                              setInfo={setInfo}
                              name={name}
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
