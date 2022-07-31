import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";
import { Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";


const theme = createTheme({
  direction: "rtl", 
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

type IProps = {
  stationsData: Array<dataParam>;
  title: string;
};

type dataParam = {
  id: number;
  location: string;
  network: string | null;
  status: Status;
};

type Status = {
  OK: number;
  ERROR: number;
  FAILED: number;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const labels = ["OK", "ERROR", "FAILED"];

const useRerender = () => {
  const [, reRender] = useState({});
  return () => reRender({});
};

const MultiCheckBoxSelect = (props: IProps) => {
  const render = useRerender();
  const { stationsData, title } = props;

  const [totalNumbers, setTotalNumbers] = useState({
    totalOK: 0,
    totalFAILED: 0,
    totalERROR: 0,
  });

  const handleAutocompleteChange = (event: any, value: Array<dataParam>) => {
    let totalOkTemp = 0;
    let totalErrorTemp = 0;
    let totalFailedTemp = 0;
    value?.forEach((ele) => {
      totalOkTemp = totalOkTemp + ele.status.OK;
      totalErrorTemp = totalErrorTemp + ele.status.ERROR;
      totalFailedTemp = totalFailedTemp + ele.status.FAILED;
    });
    setTotalNumbers({
      totalOK: totalOkTemp,
      totalERROR: totalErrorTemp,
      totalFAILED: totalFailedTemp,
    });
  };
  useEffect(() => {
    render();
  }, [stationsData]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container display={"flex"} justifyContent="center">
          <Typography fontWeight={700}>{title}</Typography>
        </Grid>
        <Grid item md={7} mt={2}>
          <DoughnutChart
            labels={labels}
            data={[
              totalNumbers.totalOK,
              totalNumbers.totalERROR,
              totalNumbers.totalFAILED,
            ]}
            chartTitle=" "
          />
        </Grid>
        <Grid item xs="auto">
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Autocomplete
                options={stationsData}
                onChange={handleAutocompleteChange}
                multiple
                size="small"
                limitTags={2}
                id="checkboxes-tags-demo"
                disableCloseOnSelect
                filterOptions={() => stationsData}
                isOptionEqualToValue={(option, value) => {
                  return option.id === value.id;
                }}
                getOptionLabel={(option) => option?.location}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <div dir="rtl">
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                    </div>

                    {option.location}
                  </li>
                )}
                sx={{ width: "15vw" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="מיקומים"
                    placeholder="בחר מיקום"
                  />
                )}
              />
            </ThemeProvider>
          </CacheProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default MultiCheckBoxSelect;
