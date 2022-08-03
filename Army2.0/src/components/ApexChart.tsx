import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from "react-query";
import ReactApexChart from 'react-apexcharts';
import Props from 'react-apexcharts';

const fetchUsers = async () => {
  const res = await fetch("../../../api-server/RCGW/json files/statistics/pingerdb.json");
  return res.json();
};

const ApexChart = () => {
  const { data, status } = useQuery("users", fetchUsers);
  
  /*return (<div id="chart">
    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
  </div>);*/

  return (
    <div>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div>
          {data.map((user: any) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

//const domContainer = document.querySelector('#app');
//ReactDOM.render(React.createElement(ApexChart), domContainer);
export default ApexChart;