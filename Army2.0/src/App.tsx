import { useState } from "react";
import logo from "./logo.svg";
import HeaderAppBar from "./components/HeaderAppBar";
import { Box } from "@mui/material";
import SideMenu from "./components/SideMenu";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient({   
  defaultOptions: {
    queries: {
      refetchInterval: 5000,
    },
  },
});

function App() {
  console.log(import.meta.env.VITE_SERVER_URL);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <SideMenu />
        </Box>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
