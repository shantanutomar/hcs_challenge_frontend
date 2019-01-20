import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { red } from "@material-ui/core/colors";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "./Store/Reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage/session";
import { PersistGate } from "redux-persist/lib/integration/react";

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

const persistConfig = {
  key: "user",
  storage
};
var pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
var persistor = persistStore(store);

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
