import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import { red } from "@material-ui/core/colors";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import "typeface-roboto";
import createStore from "./Store/Reducers/createStore";
import customAxios from "./Helpers/customAxios";
import {
  hideSnackBottom,
  showMessageSnackBottom
} from "./Store/Actions/appActions";
import { userActions } from "./Store/Actions/userActions";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500]
    },
    secondary: {
      main: red[500]
    }
  },
  typography: {
    useNextVariants: true
  }
});

let { store, persistor } = createStore();

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch(userActions.logout("error"));
      return Promise.reject(error);
    } else {
      store.dispatch(hideSnackBottom());
      let toastMessage = error.response.data.message;
      store.dispatch(showMessageSnackBottom(toastMessage, "error", 3000));
      return Promise.reject(error);
    }
  }
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
