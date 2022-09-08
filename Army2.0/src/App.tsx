
import {
  Box,
  CssBaseline,
} from "@mui/material";
import NewSideMenu from "./components/NewSideMenu";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import "bootstrap/dist/css/bootstrap.min.css";


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
