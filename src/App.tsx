import { useState } from "react";
import logo from "./logo.svg";
import HeaderAppBar from "./components/HeaderAppBar";
import { Box } from "@mui/material";
import SideMenu from "./components/SideMenu";
import { BrowserRouter } from "react-router-dom";

const HeaderData = {
  userName: "עמי ותמי",
  Permissions: "בית המכשפה",
  lastLogIn: "14:24 - 01/06/2022",
  pakalMonitored: "b1g d",
};

function App() {
  return (
    <BrowserRouter>
      <Box
        // dir="rtl"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <SideMenu />
        {/* <HeaderAppBar HeaderData={HeaderData} /> */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
