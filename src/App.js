import React, { Component } from "react";
import "./App.css";
import Login from "./Containers/Login/Login";
import { withTheme } from "@material-ui/core/styles";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default withTheme()(App);
// export default App;
