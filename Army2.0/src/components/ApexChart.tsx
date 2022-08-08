import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from "react-query";
import ReactApexChart from 'react-apexcharts';
import { stringify } from 'querystring';
import { color } from '@mui/system';

interface State {
  time: string;
  state: string;
}

interface StateRecord {
  [key: string]: {[ip: string]: Array<State>}
}

interface SeriesItem {
  name: string;
  data: Array<{x: string; y: Array<Number>;}>;
}

const temp: StateRecord = 
{
  "Unit99": 
  {
    "A.A.A.A": [{"time": "08/08/2022 08:05:36", "state": "down"}, {"time": "08/08/2022 08:32:36", "state": "up"}, {"time": "08/08/2022 09:05:36", "state": "down"}, {"time": "08/08/2022 09:32:36", "state": "up"}],
    "B.B.B.B": [{"time": "08/08/2022 09:05:36", "state": "down"}, {"time": "08/08/2022 09:32:36", "state": "up"}],
    "C.C.C.C": [{"time": "08/08/2022 09:05:36", "state": "down"}, {"time": "08/08/2022 09:32:36", "state": "up"}],
    "D.D.D.D": [{"time": "08/08/2022 09:05:36", "state": "down"}, {"time": "08/08/2022 09:32:36", "state": "up"}],
    "E.E.E.E": [{"time": "08/08/2022 09:05:36", "state": "up"}, {"time": "08/08/2022 09:32:36", "state": "down"}],
    "F.F.F.F": [{"time": "08/08/2022 09:05:36", "state": "up"}, {"time": "08/08/2022 09:32:36", "state": "down"}],
    "G.G.G.G": [{"time": "08/08/2022 09:05:36", "state": "up"}, {"time": "08/08/2022 09:32:36", "state": "down"}],
    "H.H.H.H": [{"time": "08/08/2022 09:05:36", "state": "up"}, {"time": "08/08/2022 09:32:36", "state": "down"}],
    "I.I.I.I": [{"time": "08/08/2022 09:05:36", "state": "up"}, {"time": "08/08/2022 09:32:36", "state": "down"}]
  }
};

const fetchUsers = async () => 
{
  const res = await fetch("../../../api-server/RCGW/json files/statistics/pingerdb.json"); 
  return res.json();
};

const ApexChart = () => 
{
  const [series, setSeries] = useState(Array<SeriesItem>);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '70%',
        rangeBarGroupRows: true
      }
    },
    colors: [
      "#55FF55", "#FF5555"
    ],
    fill: {
      type: 'solid'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    legend: {
      position: 'right'
    },
    tooltip: {
      custom: function(opts: any) {
        const fromYear = new Date(opts.y1).getFullYear()
        const toYear = new Date(opts.y2).getFullYear()
        const values = opts.ctx.rangeBar.getTooltipValues(opts)    
        return fromYear + " to " + toYear + " | " + values;
      }
    }
  });

  Object.keys(temp).map((unit: string) => 
  {
    
    Object.keys(temp[unit]).map((ip) => 
    {
      var upSeriesItem: SeriesItem = 
    {
      name: "up",
      data: []
    };
    var downSeriesItem: SeriesItem = 
    {
      name: "down",
      data: []
    };
      temp[unit][ip].map((state) =>
      {
        var localTime = new Date();
        var year = localTime.getFullYear();
        var month = localTime.getMonth() + 1;
        var day = localTime.getDate();
        var hours = localTime.getHours();
        var minutes = localTime.getMinutes();
        var seconds = localTime.getSeconds();
        // const [currentDateTime, setCurrentDateTime] = useState(day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds);
        let currentDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        // console.log(currentDateTime + " | " + state.time + " | " + state.state); 

        let index = temp[unit][ip].indexOf(state);
        let endStateTime = temp[unit][ip].length > index + 1 ? temp[unit][ip][index + 1].time : state.time;
        console.log(new Date(endStateTime).getTime() + " | " + endStateTime)
        //console.log(unit + " : " + ip + " : {" + state.state + " : " + state.time + "}");
        
        if (state.state == "up")
        {          
          upSeriesItem.data.push({
            x: ip,
            y: [
              new Date(state.time).getTime(),
              new Date(endStateTime).getTime()
            ]
          });
        }
        else if (state.state == "down")
        {
          downSeriesItem.data.push({
            x: ip,
            y: [
              new Date(state.time).getTime(),
              new Date(endStateTime).getTime()
            ]
          });
        }
        /*=
        {
          name: state.state,
          data: [
            {
              x: ip,
              y: [
                new Date(state.time).getTime(),
                new Date(endStateTime).getTime()
              ]
            }
          ]
        };*/
      });
      console.log(upSeriesItem);
      series.push(upSeriesItem);
    series.push(downSeriesItem);
    });
    
  });
    
  return (<div id="chart">
    <ReactApexChart options={options} series={series} type="rangeBar" height={350} />
  </div>);
};

export default ApexChart;