import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";




const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    divider: "black",
    background: {
      default: "black",
      paper: "black",
    },
    text: {
      // primary: 'white',
      secondary: "white",
    },
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <ThemeProvider theme={darkTheme}>
  //     <CssBaseline />
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
    // </ThemeProvider>
);
