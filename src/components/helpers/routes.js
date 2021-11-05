import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  loggedIn,
  path,
  location,
}) => (
  <Route
    exact
    path={path}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )
    }
  />
);

export const GuestRoute = ({
  component: Component,
  loggedIn,
  path,
  location,
}) => (
  <Route
    path={path}
    exact
    render={() =>
      loggedIn ? (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      ) : (
        <Component />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
  loggedIn: false,
};

GuestRoute.defaultProps = {
  loggedIn: false,
};
