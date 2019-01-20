import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ renderFunc, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        //   localStorage.getItem("user") ? (
        user ? (
          renderFunc(routeProps)
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: routeProps.location } }}
          />
        )
      }
    />
  );
};
var mapStateToProps = state => {
  return {
    user: state.userReducer.user.data
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);