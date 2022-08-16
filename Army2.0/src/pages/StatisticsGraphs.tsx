// עמוד סטטיסטיקות
import React from "react";
import DoughuntCharts from "../components/DoughnutCharts";
import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import DynamicSection from "../components/DynamicSection";
import NetWorkChart from "../components/NetworkChart";

type Props = { selectedUnit: string };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  // borderRight: "2px solid black",
  // borderLeft: "2px solid black",
  // borderBottom: "2px solid primary.main",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  color: theme.palette.text.secondary,
  height: 420,
}));

const StatisticsGraphs = (props: Props) => {
  const { selectedUnit } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={{ xs: 2 }} columnSpacing={{ xs: 2 }}>
        <Grid item xs={4}>
          <Typography
            variant="inherit"
            align="center"
            bgcolor={"#2e3b55"}
            color={"white"}
            sx={{
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              letterSpacing: "0.9px",
            }}
          >
            כשירות רכיבים
          </Typography>
          <Item>
            <DoughuntCharts selectedUnit={selectedUnit} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="inherit"
            align="center"
            bgcolor={"#2e3b55"}
            color={"white"}
            sx={{
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              letterSpacing: "0.9px",
            }}
          >
            כשירות מקמ"שים בחתך רשתות
          </Typography>
          <Item>
            <NetWorkChart selectedUnit={selectedUnit} />
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Typography
            variant="inherit"
            align="center"
            bgcolor={"#2e3b55"}
            color={"white"}
            sx={{
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              letterSpacing: "0.9px",
            }}
          >
            כשירות מקמ"שים כ"ל
          </Typography>
          <Item>כשירות מקמ"שים כ"ל</Item>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="inherit"
            align="center"
            bgcolor={"#2e3b55"}
            color={"white"}
            sx={{
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              letterSpacing: "0.9px",
            }}
          >
            כשירות מקמ"שים בחתך מיקומים
          </Typography>
          <Paper sx={{padding:1,pb:3}}>
            <DynamicSection selectedUnit={selectedUnit} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsGraphs;
