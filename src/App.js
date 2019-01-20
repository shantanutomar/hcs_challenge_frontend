import React, { Component } from "react";
import "./App.css";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import { withTheme } from "@material-ui/core/styles";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./Helpers/history";
import PrivateRoute from "./Containers/PrivateRoute/PrivateRoute";
import HomePage from "./Containers/HomePage/HomePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                renderFunc={routeProps => <HomePage {...routeProps} />}
              />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withTheme()(App);
// export default App;
