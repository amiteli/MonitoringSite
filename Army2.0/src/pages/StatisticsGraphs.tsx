// עמוד סטטיסטיקות
import React from "react";
import DoughuntCharts from "../components/DoughnutCharts";
import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import DynamicSection from "../components/DynamicSection";
import NetWorkChart from "../components/NetworkChart";

type Props = { selectedUnit: string };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StatisticsGraphs = (props: Props) => {
  const { selectedUnit } = props;
  return (
    <div>
      <Grid container direction="column" sx={{ width: "100%" }}>
        <Grid container>
          <Grid
            item
            mb={2}
            xs={11.8}
            bgcolor={"rgba(242, 242, 242)"}
            borderRadius={4}
            height={"100%"}
          >
            <Typography
              variant="h5"
              align="center"
              mb={2}
              bgcolor={"rgba(75, 192, 192, 1)"}
              color={"white"}
              p={0.5}
              sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            >
              פילוח תקינות רכיבים
            </Typography>
            <DoughuntCharts selectedUnit={selectedUnit} />
          </Grid>
          
          <Grid
            item
            xs={5.5}
            bgcolor={"rgba(242, 242, 242)"}
            borderRadius={4}
            ml={2}
          >
            <Typography
              variant="h6"
              align="center"
              mb={1}
              bgcolor={"secondary.main"}
              color={"white"}
              sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            >
              רשתות מול מקמ"שים
            </Typography>
            <NetWorkChart selectedUnit={selectedUnit}/>
          </Grid>
          <Grid item xs={6.2} bgcolor={"rgba(242, 242, 242)"} borderRadius={4}>
            <Typography
              variant="h6"
              align="center"
              mb={1}
              bgcolor={"success.main"}
              color={"white"}
              sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            >
              גרף נוסף
            </Typography>
          </Grid>
        </Grid>
        <Grid
            item
            mb={2}
            mt={2}
            xs={10}
            bgcolor={"rgba(242, 242, 242)"}
            borderRadius={4}
            height={"100%"}
          >
            <Typography
              variant="h5"
              align="center"
              mb={1}
              bgcolor={"primary.main"}
              color={"white"}
              p={0.5}
              sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            >
              פילוח על פי גרפים
            </Typography>
            <DynamicSection selectedUnit={selectedUnit} />
          </Grid>
      </Grid>
    </div>
  );
};

export default StatisticsGraphs;
