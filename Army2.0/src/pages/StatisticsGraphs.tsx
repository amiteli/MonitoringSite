// עמוד סטטיסטיקות
import React, { useState } from "react";
import DoughuntCharts from "../components/DoughnutCharts";
import { styled } from "@mui/material/styles";
import { Box, Chip, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import DynamicSection from "../components/DynamicSection";
import NetWorkChart from "../components/NetworkChart";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import MakmashKl from "../components/MakmashKl";

type Props = { selectedUnit: string };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  color: theme.palette.text.secondary,
}));
const ItemNetwork = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  color: theme.palette.text.secondary,
  height: "100%",
}));
const ItemLocal = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  color: theme.palette.text.secondary,
}));

const StatisticsGraphs = (props: Props) => {
  const { selectedUnit } = props;
  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 2 }}
        columnSpacing={{ xs: 2 }}
        direction="row"
      >
        <Grid padding={2} xs={6} paddingLeft={0}>
          <Grid
            container
            rowSpacing={{ xs: 2 }}
            columnSpacing={{ xs: 2 }}
            direction="column"
          >
            <Grid item xs={6}>
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
                <Stack
                  direction="row"
                  padding={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Chip label="CCU" />
                  <Chip label="Deploy" variant="outlined" />
                </Stack>
                <DoughuntCharts selectedUnit={selectedUnit} />
              </Item>
            </Grid>
            <Grid item xs={6}>
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
              <ItemLocal sx={{ pb: 2 }}>
                <DynamicSection selectedUnit={selectedUnit} />
              </ItemLocal>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={{ xs: 2 }}
          columnSpacing={{ xs: 2 }}
          xs={6}
          paddingTop={2}
        >
          <Grid padding={2} xs={7}>
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
            <ItemNetwork>
              <NetWorkChart selectedUnit={selectedUnit} />
            </ItemNetwork>
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
            <ItemNetwork><MakmashKl selectedUnit={selectedUnit}/></ItemNetwork>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticsGraphs;
