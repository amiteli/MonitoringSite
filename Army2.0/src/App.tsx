import { useState } from "react";
import logo from "./logo.svg";
import HeaderAppBar from "./components/HeaderAppBar";
import {
  Box,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Switch,
} from "@mui/material";
import NewSideMenu from "./components/NewSideMenu";
import SideMenu from "./components/SideMenu";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { ThemeProvider } from "react-bootstrap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <CssBaseline />
        <Box
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <NewSideMenu />
        </Box>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
