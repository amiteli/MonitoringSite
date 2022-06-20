import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "react-query";
import { useState } from "react";
import OneStation from "./OneStation";

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
        for (let i = 0; i < data.WorkingStations.length; i++) {
          if (!tempArr.includes(data.WorkingStations[i].type)) {
            // setHeadersName([...headersName, data.WorkingStations[i].type]);
            tempArr.push(data.WorkingStations[i].type);
          }
        }
        setHeadersName(tempArr);
        setStations(data.WorkingStations);
      },
    }
  );

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;
  return (
    <div>
      {headersName &&
        headersName.map((header, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-content ${index}`}
                id={`panel-content ${index} header`}
              >
                <Typography>{header}</Typography>
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
