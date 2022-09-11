// עמוד סטטיסטיקות
import React, { useState } from "react";
import DoughuntCharts from "../components/DoughnutCharts";
import { styled } from "@mui/material/styles";
import { Box, Chip, Divider, Grid, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import DynamicSection from "../components/DynamicSection";
import NetWorkChart from "../components/NetworkChart";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import MakmashKl from "../components/MakmashKl";
import { fetchData } from "../components/TokenController";
import { useNavigate } from "react-router-dom";

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
function chip(
  name: string,
  fail: number | string,
  ok: number | string,
  failText: string,
  okText: string
) {
  let Fail = fail;
  let OK = ok;
  return (
    <>
      <Divider>{name}</Divider>
      <Typography variant="subtitle2" color={"#FFB1C1"}>
        {fail} {failText}
      </Typography>
      <Typography variant="subtitle2" color={"#A5DFDF"}>
        {ok} {okText}
      </Typography>
    </>
  );
}

const StatisticsGraphs = (props: Props) => {
  const navigate = useNavigate();
  const [okCCU, setOkCCU] = useState<number>(0);
  const [failCCU, setFailCCU] = useState<number>(0);
  const [okDeploy, setOkDeploy] = useState<string>("");
  const [failDeploy, setFailDeploy] = useState<string>("");
  const fetchSdsCcu = () =>
    fetchData("/RoipMonitoring/Units/matzov/SdsCcuStatistics", navigate);

  const { data, isLoading, isError } = useQuery<any>(
    "SdsCcuData",
    fetchSdsCcu,
    {
      onSuccess: (data) => {
        setOkCCU(data["CCU"][0].number);
        setFailCCU(data["CCU"][2].number);
        setOkDeploy(data["SDS"])
        if(okDeploy == ""){
          setFailDeploy("אין תקינים") 
        } 

      },
    }
  );
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
                  <Tooltip title={chip("CCU", failCCU, okCCU, "תקולים", "תקינים")}>
                    <Chip label={"CCU"} />
                  </Tooltip>
                  <Tooltip title={chip("Deploy", "", "", failDeploy, okDeploy)}>
                    <Chip label={"Deploy"} variant="outlined"/>
                  </Tooltip>
                  
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
            <ItemNetwork>
              <MakmashKl selectedUnit={selectedUnit} />
            </ItemNetwork>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StatisticsGraphs;
