import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/*
A Private route gaurd that will validate everytime that user is authentic and then allow activity
*/

const PrivateRoute = ({ renderFunc, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
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
