import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Dialog,
  Divider,
  IconButton,
  Toolbar,
  Typography,
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
type oneDevice = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

type oneBlock = {
  id: number;
  location: string;
  type: string;
  devices: Array<oneDevice>;
};

type GeneralDataBlocks = {
  WorkingStations: Array<oneBlock>;
};

type DevicePerems = {
  location: string;
  type: string;
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const GeneralAccordion = (props: IProps) => {
  const { selectedUnit } = props;

  const [errorText, setErrorText] = useState(" ");
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [stations, setStations] = useState<Array<oneBlock>>([]);
  const [amount, setAmount] = useState<number[]>([]);
  const [sum, setSum] = useState<number>();
  const [open, setOpen] = useState(false);

  const fetchUnitDevicesData = async (): Promise<GeneralDataBlocks> => {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/charts/rcgw-chart-data/${selectedUnit}`
      // {
      //   headers: { authorization: "Bearer " + accessToken },
      // }
    );
    if (!res.ok) {
      console.log("error at fetching headerList");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      // console.log(res.status, res.statusText, res.url);

      throw new Error("Problem fetching data at fetchUnitDevicesData function");
    }
    return res.json();
  };

  const { isLoading, isError } = useQuery<GeneralDataBlocks>(
    "FileData",
    fetchUnitDevicesData,
    {
      onSuccess: (data) => {
        let tempArr: Array<string> = [];
        let counterArr: Array<number> = [];
        let sum: number = 0;
        let index: number = 0,
          c = 0;

        for (let i = 0; i < data.WorkingStations.length; i++) {
          if (!tempArr.includes(data.WorkingStations[i].type)) {
            // setHeadersName([...headersName, data.WorkingStations[i].type]);
            tempArr.push(data.WorkingStations[i].type);
            sum+=c;
            index++;
            c = 0;
          }
          counterArr[index] = ++c;
        }
        sum += counterArr[index];
        setHeadersName(tempArr);
        setAmount(counterArr);
        setStations(data.WorkingStations);
        setSum(sum);
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
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              כל הכלים {<>({sum})</>}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, p: 2 }}>
          {headersName &&
            headersName.map((header, index) => {
              return (
                <Box mb={3}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "primary.main",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {amount[index + 1]} {header}
                  </Typography>
                  <Divider />

                  <Grid container direction="row">
                    {stations?.map((station, index) => {
                      if (station.type === header) {
                        return (
                          <OneStation
                            key={index}
                            location={station.location}
                            devices={station.devices}
                          />
                        );
                      }
                    })}
                  </Grid>
                </Box>
              );
            })}
        </Box>
      </Dialog>
      <Grid container justifyContent={"flex-end"} mb={2}>
        <Button onClick={handleClickOpen}>
          הצג הכל
          <FullscreenIcon sx={{ mr: 0.5 }} />
        </Button>
      </Grid>

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
                  {header} {<>({amount[index + 1]})</>}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row">
                  {stations?.map((station, index) => {
                    if (station.type === header) {
                      return (
                        <OneStation
                          key={index}
                          location={station.location}
                          devices={station.devices}
                        />
                      );
                    }
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export default GeneralAccordion;