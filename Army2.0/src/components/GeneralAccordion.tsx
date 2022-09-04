import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "react-query";
import { useState } from "react";
import OneStation from "./OneStation";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Box, fontWeight } from "@mui/system";
import Grid from "@mui/material/Grid";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { styled } from "@mui/material/styles";

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
const MyButton = styled(Button)({
  border: "1px solid #2e3b55",
  borderRadius: 6,
  color: "white",
  height: 38,
  padding: "0 12px",
  backgroundColor: "#2e3b55",
  "&:hover": {
    backgroundColor: "#2e3b55",
    color: "#f0bc5e",
  },
});
const GeneralAccordion = (props: IProps) => {
  const { selectedUnit } = props;

  const [errorText, setErrorText] = useState(" ");
  const [headersName, setHeadersName] = useState<string[]>([]);
  const [stations, setStations] = useState<Array<oneBlock>>([]);
  const [amount, setAmount] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const fetchUnitDevicesData = async (): Promise<GeneralDataBlocks> => {
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

  const { isLoading, isError } = useQuery<GeneralDataBlocks>(
    "FileData",
    fetchUnitDevicesData,
    {
      onSuccess: (data) => {
        console.log("GENERAL VIEW: ")
        console.log(data)
        let dataAmountOfStations = data.WorkingStations;
        let tempArr: Array<string> = [];
        let counterArr: Array<number> = [];
        let index: number = 0,
          c = 0;

        for (let i = 0; i < dataAmountOfStations.length; i++) {
          if (!tempArr.includes(dataAmountOfStations[i].type)) {
            tempArr.push(dataAmountOfStations[i].type);
            index++;
            c = 0;
          }
          counterArr[index] = ++c;
        }
        setHeadersName(tempArr);
        setAmount(counterArr);
        setStations(data.WorkingStations);
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
    <>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative", backgroundColor: "#2e3b55" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              כל הכלים
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
                      color: "#2e3b55",
                      fontWeight: "bold",
                    }}
                  >
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
      <Grid container mb={2} justifyContent={"flex-end"}>
        <MyButton onClick={handleClickOpen}>
          הצג הכל
          <FullscreenIcon sx={{ mr: 0.5 }} />
        </MyButton>
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
    </>
  );
};

export default GeneralAccordion;
