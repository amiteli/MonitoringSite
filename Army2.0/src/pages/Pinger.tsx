// עמוד פינגר
import React from "react";
import ReactApexChart from "apexcharts";
import "../components/style/timeline-chart-style.css";
import TimelineChartItem, {
  TimelineChartItemProps,
  TimelineDateTime,
} from "../components/TimelineChartItem";
import TimelineChartRecord, {
  TimelineChartRecordProps,
} from "../components/TimelineChartRecord";
import TimelineChart, { TimelineChartProps } from "../components/TimelineChart";
import { Calculate } from "@mui/icons-material";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import IpBlock from "../components/IpBlock";
import CategoryBlock from "../components/CategoryBlock";
import { CategoryBlockProps } from "../components/CategoryBlock";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const theme = createTheme({
  direction: "rtl",
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export function stringToDateTimeObject(dateTimeString: string): Date {
  var temp = dateTimeString;
  let date = new Date();
  date.setDate(
    parseInt(dateTimeString.substring(0, dateTimeString.indexOf("/")))
  );
  dateTimeString = dateTimeString.substring(dateTimeString.indexOf("/") + 1);
  date.setMonth(
    parseInt(dateTimeString.substring(0, dateTimeString.indexOf("/")))
  );
  dateTimeString = dateTimeString.substring(dateTimeString.indexOf("/") + 1);
  date.setFullYear(
    parseInt(dateTimeString.substring(0, dateTimeString.indexOf(" ")))
  );
  dateTimeString = dateTimeString.substring(dateTimeString.indexOf(" ") + 1);
  date.setHours(
    parseInt(dateTimeString.substring(0, dateTimeString.indexOf(":")))
  );
  dateTimeString = dateTimeString.substring(dateTimeString.indexOf(":") + 1);
  date.setMinutes(
    parseInt(dateTimeString.substring(0, dateTimeString.indexOf(":")))
  );
  dateTimeString = dateTimeString.substring(dateTimeString.indexOf(":") + 1);
  date.setSeconds(parseInt(dateTimeString));
  return date;
}

export interface State {
  time: string;
  state: string;
}

interface StateRecord {
  [unit: string]: { [category: string]: { [ip: string]: Array<State> } };
}

interface SeriesItem {
  name: string;
  data: Array<{ x: string; y: Array<Number> }>;
}

export interface Visibility {
  [ip: string]: boolean;
}

const selectedUnit = "Unit99";

export type PingerProps = {};

const Pinger = (props: PingerProps) => {
  const [records, setRecords] = useState<Array<TimelineChartRecordProps>>([]);

  const [zoomLevel, setZoomLevel] = useState(1.0);

  const [currentPage, setCurrentPage] = useState("main");
  const [errorText, setErrorText] = useState(" ");
  const [database, setDatabase] = useState<StateRecord>({});
  const [clickedIp, setClickedIp] = useState<string | null>(null);
  const handlePageChange = (page: string, ip: string) => {
    setClickedIp(ip);
    setTimeout(() => {
      setClickedIp(null);
    }, 5000);
    setCurrentPage(page);
  };

  useEffect(() => {
    let chartElement: HTMLDivElement = document.getElementById(
      "timeline_states_wrapper"
    ) as HTMLDivElement;
    if (chartElement && chartWidth == 0) {
      handleChartWidth();
    }
  }, [currentPage]);

  const [defaultStartTime, setDefaultStartDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleStartChange = (newStart: Date | null) => {
    if (
      newStart &&
      endDate &&
      newStart < endDate &&
      newStart >= defaultStartTime
    ) {
      setStartDate(newStart);
    }
  };

  const [useCustomizedEndDate, setCustomizedEndDate] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const handleEndChange = (newEnd: Date | null) => {
    if (newEnd && startDate && newEnd < new Date() && newEnd > startDate) {
      setCustomizedEndDate(true);
      setEndDate(newEnd);
    }
  };

  const [resolution, setResolution] = useState("ימים");
  const handleResolutionChange = (event: SelectChangeEvent) => {
    setResolution(event.target.value as string);
  };

  const [chartWidth, setChartWidth] = useState(0);
  const handleChartWidth = (): void => {
    let chartParent = document.getElementsByClassName(
      "flex-timeline-chart-container"
    )[0] as HTMLDivElement;
    let parentWidth = chartParent.clientWidth;
    let chartContainerWidth = 0;
    for (let i = 0; i < chartParent.children.length; i++) {
      chartContainerWidth += (chartParent.children[i] as HTMLDivElement)
        .clientWidth;
    }
    let width = parentWidth - chartContainerWidth;

    let periodsCount = Math.floor((width - 80) / 180);
    let newChartWidth = periodsCount * 180 + 81;
    setChartWidth(newChartWidth);
  };
  window.onload = function () {
    handleChartWidth();
  };

  const fetchPingHistory = async (): Promise<StateRecord> => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/pinger/hitory/${selectedUnit}`
    );
    if (!res.ok) {
      console.log("error at fetching pinger hitory data");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<StateRecord>(
    "history",
    fetchPingHistory,
    {
      onSuccess: (data) => {
        if (useCustomizedEndDate == false) {
          setDatabase(data);
          setEndDate(new Date());
          console.log(
            "Data is: " +
              data +
              " End is: " +
              endDate?.toString() +
              ", Customized: " +
              useCustomizedEndDate
          );
        }
      },
    }
  );

  let result;

  if (currentPage == "secondary") {
    let chartElement: HTMLDivElement = document.getElementById(
      "timeline_states_wrapper"
    ) as HTMLDivElement;
    if (chartElement && chartWidth == 0) {
      handleChartWidth();
    }

    const scrollLeft = () => {
      const timelineStatesContainer = document.getElementsByClassName(
        "timeline-states-container"
      )[0];
      (timelineStatesContainer as HTMLDivElement).scroll({
        left: (timelineStatesContainer as HTMLDivElement).scrollLeft - 150,
        behavior: "smooth",
      });
    };

    const scrollRight = () => {
      const timelineStatesContainer = document.getElementsByClassName(
        "timeline-states-container"
      )[0];
      (timelineStatesContainer as HTMLDivElement).scroll({
        left: (timelineStatesContainer as HTMLDivElement).scrollLeft + 150,
        behavior: "smooth",
      });
    };

    const setRealtime = () => {
      setCustomizedEndDate(false);
      setEndDate(new Date());
    };

    function zoomOutClick(
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void {
      if (zoomLevel > 1) {
        setZoomLevel(zoomLevel - 1);
      }
    }

    function zoomInClick(
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void {
      setZoomLevel(zoomLevel + 1);
    }

    Object.keys(database).map((unit: string) => {
      if (unit == selectedUnit) {
        let recordIndex = 0;
        Object.keys(database[unit]).map((category: string) => {
          Object.keys(database[unit][category]).map((ip: string) => {
            let timelineRecord: TimelineChartRecordProps = {
              selectedStart: records[recordIndex]
                ? records[recordIndex].selectedStart
                : null,
              selectedEnd: records[recordIndex]
                ? records[recordIndex].selectedEnd
                : null,
              ipAddress: ip,
              statesProps: [],
              secondsPer180Px: 0,
              totalWidth: 0,
              upTime: 0,
              downTime: 0,
              hidden: records[recordIndex]
                ? records[recordIndex].hidden
                : false,
              clickedIp: clickedIp,
            };

            // find the initial default start time
            let defaultStart = new Date();
            database[unit][category][ip].map((state: State) => {
              let startDateTime = stringToDateTimeObject(state.time);
              startDateTime.setMonth(startDateTime.getMonth() - 1);
              if (!startDate && defaultStart > startDateTime) {
                defaultStart = startDateTime;
              }
            });

            if (!startDate) {
              setStartDate(defaultStart);
              setDefaultStartDate(defaultStart);
            }

            let stateIndex = 0;
            database[unit][category][ip].map((state: State) => {
              let now = new Date();
              let year = now.getFullYear();
              let month = now.getMonth() + 1;
              let day = now.getDate();
              let hours = now.getHours();
              let minutes = now.getMinutes();
              let seconds = now.getSeconds();
              let currentDateTime =
                day +
                "/" +
                month +
                "/" +
                year +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds;

              let index = database[unit][category][ip].indexOf(state);
              let endStateTime =
                database[unit][category][ip].length > index + 1
                  ? database[unit][category][ip][index + 1].time
                  : currentDateTime;
              let startDateTime = stringToDateTimeObject(state.time);
              let endDateTime = stringToDateTimeObject(endStateTime);

              startDateTime.setMonth(startDateTime.getMonth() - 1);
              endDateTime.setMonth(endDateTime.getMonth() - 1);

              let inTime = true;
              if (startDate && endDate) {
                if (endDateTime <= startDate || startDateTime >= endDate) {
                  inTime = false;
                }

                if (startDateTime < startDate && endDateTime > startDate) {
                  startDateTime = startDate;
                }

                if (endDateTime > endDate && startDateTime < endDate) {
                  endDateTime = endDate;
                }
              }

              if (inTime == true) {
                let stateDurationSeconds =
                  (endDateTime.getTime() - startDateTime.getTime()) / 1000;

                if (state.state == "up")
                  timelineRecord.upTime += stateDurationSeconds;
                if (state.state == "down")
                  timelineRecord.downTime += stateDurationSeconds;

                let timelineChartItem: TimelineChartItemProps = {
                  color:
                    state.state == "up"
                      ? "#29B971"
                      : state.state == "down"
                      ? "#FF5555"
                      : "#757575",
                  state: state.state,
                  start: {
                    day: startDateTime.getDate(),
                    month: startDateTime.getMonth(),
                    year: startDateTime.getFullYear(),
                    hour: startDateTime.getHours(),
                    minute: startDateTime.getMinutes(),
                    second: startDateTime.getSeconds(),
                  },
                  end: {
                    day: endDateTime.getDate(),
                    month: endDateTime.getMonth(),
                    year: endDateTime.getFullYear(),
                    hour: endDateTime.getHours(),
                    minute: endDateTime.getMinutes(),
                    second: endDateTime.getSeconds(),
                  },
                  timeInSeconds: stateDurationSeconds,
                  secondsPer180Px: 0,
                };

                if (timelineRecord.statesProps[stateIndex]) {
                  timelineRecord.statesProps[stateIndex] = timelineChartItem;
                } else {
                  timelineRecord.statesProps.push(timelineChartItem);
                }
                stateIndex++;
              }
            });

            if (timelineRecord.statesProps.length > 0) {
              if (records[recordIndex]) {
                records[recordIndex] = timelineRecord;
              } else {
                records.push(timelineRecord);
              }
              recordIndex++;
            }
          });
        });
      }
    });

    result = (
      <div>
        <div className="filters-wrapper">
          <div className="filter-dt-w">
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="datepicker-label">
                    הצג נתונים מ (תאריך/שעה)
                  </div>
                  <DateTimePicker
                    value={startDate}
                    onChange={(newValue) => {
                      handleStartChange(newValue);
                    }}
                    maxDate={endDate}
                    minDate={defaultStartTime}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </CacheProvider>
          </div>

          <div className="filter-dt-w" style={{ marginRight: "25px" }}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="datepicker-label">
                    הצג נתונים עד (תאריך/שעה)
                  </div>
                  <DateTimePicker
                    value={endDate}
                    onChange={(newValue) => {
                      handleEndChange(newValue);
                    }}
                    maxDate={new Date()}
                    minDate={startDate}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </CacheProvider>
          </div>

          <div
            className="pinger-header-button noselect"
            style={{ marginRight: "25px" }}
            onClick={(event) => setRealtime()}
          >
            <span className="ph-span">איפוס זמן סיום</span>
          </div>

          <div
            className="pinger-header-button noselect"
            onClick={(event) => setStartDate(defaultStartTime)}
          >
            <span className="ph-span">איפוס זמן התחלה</span>
          </div>

          <div
            className="pinger-header-button noselect"
            style={{
              minHeight: "40px",
              minWidth: "40px",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
            onClick={(event) => setCurrentPage("main")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 511.96"
            >
              <path d="M10.44 0h196.59c5.75 0 10.45 4.7 10.45 10.44v196.59c0 5.75-4.7 10.45-10.45 10.45H10.44C4.7 217.48 0 212.78 0 207.03V10.44C0 4.7 4.7 0 10.44 0zm294.52 294.48h196.59c5.74 0 10.45 4.69 10.45 10.44v196.6c0 5.74-4.71 10.44-10.45 10.44H304.96c-5.75 0-10.45-4.7-10.45-10.44v-196.6c0-5.75 4.7-10.44 10.45-10.44zm0-294.48h196.59C507.29 0 512 4.7 512 10.44v196.59c0 5.75-4.71 10.45-10.45 10.45H304.96c-5.75 0-10.45-4.7-10.45-10.45V10.44c0-5.74 4.7-10.44 10.45-10.44zM10.44 294.48h196.59c5.75 0 10.45 4.69 10.45 10.44v196.6c0 5.74-4.7 10.44-10.45 10.44H10.44C4.7 511.96 0 507.26 0 501.52v-196.6c0-5.75 4.7-10.44 10.44-10.44z" />
            </svg>
          </div>

          <div
            className="pinger-header-button noselect"
            style={{
              minHeight: "40px",
              minWidth: "40px",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
            onClick={(event) => zoomOutClick(event)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 281.62"
            >
              <path
                fill-rule="nonzero"
                d="M256 0c35.46 0 67.59 14.39 90.85 37.64 23.28 23.29 37.67 55.41 37.67 90.88 0 22.57-5.83 43.78-16.06 62.22l56.93 48.2c3.48 2.95 3.91 8.24.94 11.73l-23.85 28.04c-2.98 3.48-8.23 3.89-11.73.94l-57.1-48.34-.25-.22c-21.54 16.29-48.35 25.95-77.4 25.95-35.47 0-67.59-14.39-90.85-37.65-23.28-23.29-37.67-55.41-37.67-90.87 0-35.47 14.39-67.59 37.65-90.85C188.41 14.39 220.53 0 256 0zM72 157.1l33.83 7.67a171.169 171.169 0 0 1-3.88-36.25c0-12.2 1.3-24.11 3.73-35.58l-33.66 8.71.01-32.34a4.63 4.63 0 0 0-1.09-3.73 4.62 4.62 0 0 0-6.51-.45L1.58 124.75l-.52.55c-1.62 1.96-1.35 4.88.61 6.5l62.84 60.19c1.02.82 2.37 1.22 3.76.97 2.5-.45 4.17-2.84 3.72-5.34L72 157.1zm368 0-33.83 7.67c2.53-11.69 3.88-23.81 3.88-36.25 0-12.2-1.3-24.11-3.73-35.58l33.66 8.71-.01-32.34a4.63 4.63 0 0 1 1.09-3.73 4.62 4.62 0 0 1 6.51-.45l62.85 59.62.52.55c1.62 1.96 1.35 4.88-.61 6.5l-62.84 60.19a4.664 4.664 0 0 1-3.76.97 4.604 4.604 0 0 1-3.72-5.34L440 157.1zm-125.35-39.87v22.57c0 4.6-3.76 8.36-8.36 8.36H205.73c-4.61 0-8.36-3.76-8.36-8.36v-22.57c0-4.6 3.75-8.36 8.36-8.36h100.56c4.6 0 8.36 3.76 8.36 8.36zm22.12-69.48C316.1 27.1 287.54 14.32 256 14.32c-31.55 0-60.1 12.78-80.77 33.43-20.65 20.66-33.43 49.22-33.43 80.77 0 31.54 12.78 60.1 33.43 80.77 20.67 20.65 49.22 33.42 80.77 33.42 31.54 0 60.1-12.77 80.77-33.42 20.65-20.67 33.43-49.23 33.43-80.77 0-31.55-12.78-60.11-33.43-80.77z"
              />
            </svg>
          </div>

          <div
            className="pinger-header-button noselect"
            style={{
              minHeight: "40px",
              minWidth: "40px",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
            onClick={(event) => zoomInClick(event)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 281.62"
            >
              <path
                fill-rule="nonzero"
                d="M256 0c35.46 0 67.59 14.39 90.85 37.64 23.28 23.29 37.67 55.41 37.67 90.88 0 22.57-5.83 43.78-16.06 62.22l56.93 48.2c3.48 2.95 3.91 8.24.94 11.73l-23.85 28.04c-2.98 3.48-8.23 3.89-11.73.94l-57.1-48.34-.25-.22c-21.54 16.29-48.35 25.95-77.4 25.95-35.47 0-67.59-14.39-90.85-37.65-23.28-23.29-37.67-55.41-37.67-90.87 0-35.47 14.39-67.59 37.65-90.85C188.41 14.39 220.53 0 256 0zM72 157.1l33.83 7.67a171.169 171.169 0 0 1-3.88-36.25c0-12.2 1.3-24.11 3.73-35.58l-33.66 8.71.01-32.34a4.63 4.63 0 0 0-1.09-3.73 4.62 4.62 0 0 0-6.51-.45L1.58 124.75l-.52.55c-1.62 1.96-1.35 4.88.61 6.5l62.84 60.19c1.02.82 2.37 1.22 3.76.97 2.5-.45 4.17-2.84 3.72-5.34L72 157.1zm368 0-33.83 7.67c2.53-11.69 3.88-23.81 3.88-36.25 0-12.2-1.3-24.11-3.73-35.58l33.66 8.71-.01-32.34a4.63 4.63 0 0 1 1.09-3.73 4.62 4.62 0 0 1 6.51-.45l62.85 59.62.52.55c1.62 1.96 1.35 4.88-.61 6.5l-62.84 60.19a4.664 4.664 0 0 1-3.76.97 4.604 4.604 0 0 1-3.72-5.34L440 157.1zm-125.35-39.87v22.57c0 4.6-3.76 8.36-8.36 8.36h-30.64v30.64c0 4.6-3.76 8.36-8.37 8.36h-22.56c-4.61 0-8.36-3.76-8.36-8.36v-30.64h-30.63c-4.61 0-8.36-3.76-8.36-8.36v-22.57c0-4.6 3.75-8.36 8.36-8.36h30.63V78.24c0-4.61 3.75-8.36 8.36-8.36h22.56c4.61 0 8.37 3.75 8.37 8.36v30.63h30.64c4.6 0 8.36 3.76 8.36 8.36zm22.12-69.48C316.1 27.1 287.54 14.32 256 14.32c-31.55 0-60.1 12.78-80.77 33.43-20.65 20.66-33.43 49.22-33.43 80.77 0 31.54 12.78 60.1 33.43 80.77 20.67 20.65 49.22 33.42 80.77 33.42 31.54 0 60.1-12.77 80.77-33.42 20.65-20.67 33.43-49.23 33.43-80.77 0-31.55-12.78-60.11-33.43-80.77z"
              />
            </svg>
          </div>

          <div
            className="pinger-header-button noselect"
            style={{
              minHeight: "40px",
              minWidth: "40px",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
            onClick={scrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="20"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 298 511.93"
            >
              <path
                fill-rule="nonzero"
                d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"
              />
            </svg>
          </div>

          <div
            className="pinger-header-button noselect"
            style={{
              minHeight: "40px",
              minWidth: "40px",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
            }}
            onClick={scrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="20"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 298 511.93"
            >
              <path
                fill-rule="nonzero"
                d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
              />
            </svg>
          </div>
        </div>
        <TimelineChart
          records={records}
          setRecords={setRecords}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setCustomizedEndDate={setCustomizedEndDate}
          zoomLevel={zoomLevel}
          resolution={resolution}
          chartWidth={chartWidth}
          clickedIp={clickedIp!}
        />
        <div className="pinger-bottom-spacer"></div>
      </div>
    );
  } else {
    result = (
      <div className="blocks-screen">
        <div className="blocks-wrapper">
          {Object.keys(database).map((unit: string) => {
            if (unit == selectedUnit) {
              return Object.keys(database[unit]).map((category: string) => {
                return (
                  <CategoryBlock
                    category={category}
                    ipBlocks={database[unit][category]}
                    setCurrentPage={handlePageChange}
                  />
                );
              });
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <Grid
      container
      direction="column"
      sx={{ width: "100%" }}
      style={{
        marginTop: "-16px",
        paddingTop: "0px",
        height: "auto",
        maxHeight: "calc(100% - 200px)",
        overflowY: "auto",
      }}
    >
      <Grid container>
        <Grid
          item
          mb={2}
          xs={11.8}
          bgcolor={"rgba(242, 242, 242)"}
          borderRadius={4}
          height={"100%"}
          maxWidth={"500px"}
          width={"500px"}
          sx={{
            margin: 0,
            padding: 0,
            overflowY: "hidden",
            overflowX: "hidden",
            background: "transparent",
          }}
        >
          {result}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Pinger;
