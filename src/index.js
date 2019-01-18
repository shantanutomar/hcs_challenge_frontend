import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: green,
    error: red
  },
  status: {
    danger: "orange"
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
