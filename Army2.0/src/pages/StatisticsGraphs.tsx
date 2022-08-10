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
      <Grid container direction="column">
        <Grid container>
          <Grid
            item
            width={"30%"}
            mb={2}
            ml={2}
            bgcolor={"rgba(242, 242, 242)"}
            borderRadius={4}
            height={600}
            wrap={"nowrap"}
          >
            <Typography
              variant="h6"
              align="center"
              mb={2}
              bgcolor={"rgba(75, 192, 192, 1)"}
              color={"white"}
              sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 ,letterSpacing: "0.9px"}}
            >
              כשירות רכיבים
            </Typography>
            <DoughuntCharts selectedUnit={selectedUnit} />
          </Grid>

          <Grid item width={"30%"} ml={2} bgcolor={"rgba(242, 242, 242)"} borderRadius={4} height={600} wrap={"nowrap"}>
            <Typography
              variant="h6"
              align="center"
              bgcolor={"secondary.main"}
              color={"white"}
              sx={{
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                letterSpacing: "0.9px",
              }}
            >
              כשירות מקמ"שים בחתך רשתות
            </Typography>
            <NetWorkChart selectedUnit={selectedUnit} />
          </Grid>
          <Grid item width={"37%"} bgcolor={"rgba(242, 242, 242)"} borderRadius={4} height={600} wrap={"nowrap"}>
            <Typography
              variant="h6"
              align="center"
              bgcolor={"success.main"}
              color={"white"}
              sx={{
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                letterSpacing: "0.9px",
              }}
            >
              כשירות מקמ"שים כ"ל
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          width={"100%"}
          bgcolor={"rgba(242, 242, 242)"}
          borderRadius={4}
          height={"100%"}
        >
          <Typography
            variant="h6"
            align="center"
            mb={1}
            bgcolor={"primary.main"}
            color={"white"}
            sx={{
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              letterSpacing: "0.9px",
            }}
          >
            כשירות מקמ"שים בחתך מיקומים
          </Typography>
          <DynamicSection selectedUnit={selectedUnit} />
        </Grid>
      </Grid>
    </div>
  );
};

export default StatisticsGraphs;
