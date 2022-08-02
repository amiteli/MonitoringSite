import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Avatar,
    createStyles,
    Dialog,
    Divider,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
    withStyles,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useQuery } from "react-query";
  import { useState } from "react";
  import OneStation from "./OneStation";
  import { Button } from "react-bootstrap";
  import CloseIcon from "@mui/icons-material/Close";
  import { Box, fontWeight } from "@mui/system";
  import Grid from "@mui/material/Grid";
  import FullscreenIcon from "@mui/icons-material/Fullscreen";
  
  type IProps = {
    selectedUnit: string;
  };
  type DataBlocks = {
    Networks: Array<Network>;
  };
  type NetworkDataParam = {
    id: number;
    network: string;
    OK: number;
    ERROR: number;
    FAILED: number;
  };
  type Network = {
    network: string;
    OK: number;
    ERROR: number;
    FAILED: number;
  };
  
  const StatisticsAcordion = (props: IProps) => {
    const { selectedUnit } = props;
    const [errorText, setErrorText] = useState(" ");
    const [headersName, setHeadersName] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
  
    const fetchNetworkData = async (): Promise<any> => {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/charts/rcgw-chart-data/${selectedUnit}`
      );
      if (!res.ok) {
        console.log("error at fetching headerList");
        setErrorText(
          `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
        );
  
        throw new Error("Problem fetching data at fetchUnitDevicesData function");
      }
      return res.json();
    };
  
    const { data, isLoading, isError } = useQuery<any>(
      "NetworkChartData",
      fetchNetworkData,
      {
        onSuccess: (data) => {
          let dataNetworkHeader = data.NetworkChartData;
          let tempArr: Array<string> = [];
          dataNetworkHeader.map((element: any, index: number) => {
            tempArr.push(`${element.network}`);
          });
          setHeadersName(tempArr);
        },
      }
    );
    if (isLoading) return <>"Loading..."</>;
  
    if (isError) return <>"An error has occurred: " {errorText}</>;
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        {headersName &&
          headersName.map((header, index) => {
            return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-content ${index}`}
                    id={`panel-content ${index} header`}
                  >
                    <Typography>
                      {header} {}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="row">
                      ckckc
                    </Grid>
                  </AccordionDetails>
                </Accordion>
            );
          })}
      </div>
    );
  };
  
  export default StatisticsAcordion;
  