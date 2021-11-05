import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, withRouter } from "react-router-dom";
import { withContext } from "Context";
import { Routes } from "Constants";
import { restoreUserAction } from "Actions/authActions";
import { PrivateRoute, GuestRoute } from "Helpers/routes";
import { CustomToast, Loader } from "Common";
import Login from "Pages/Login";
import { ToastProvider } from "react-toast-notifications";
import ProLayout from "../common/ProLayout";
import { currentUser } from "../../services/user";
import { profileUpdateAction } from "../../store/actions/profileActions";
import { navigationRoutes } from "../../constants/navigationRoutes";
import { Redirect, Route } from "react-router";

const RootRoute = ({
  location,
  appLoading,
  loggedIn,
  restoreUser,
  updateProfile,
}) => {
  useEffect(() => {
    if (localStorage.accessToken) {
      currentUser()
        .then((res) => {
          restoreUser(res.data);
          // getProfilePic()
          //   .then((res) => updateProfile(res))
          //   .catch(() => {});
        })
        .catch(() => restoreUser());
    } else {
      restoreUser();
    }
  }, []);

  if (appLoading) return <Loader />;

  return (
    <ToastProvider components={{ ToastContainer: CustomToast }}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>

        <GuestRoute
          path={Routes.LOGIN}
          loggedIn={loggedIn}
          location={location}
          component={Login}
        />
        <GuestRoute
          path={Routes.REGISTRATION}
          loggedIn={loggedIn}
          location={location}
          component={Login}
        />
        <GuestRoute
          path={Routes.FORGOT_PASSWORD}
          loggedIn={loggedIn}
          location={location}
          component={Login}
        />
        <GuestRoute
          path="/update-password"
          loggedIn={loggedIn}
          location={location}
          component={Login}
        />
        <ProLayout>
          {(navigationRoutes || []).map((route) => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              loggedIn={loggedIn}
              location={location}
              component={route.component}
            />
          ))}
        </ProLayout>
      </Switch>
    </ToastProvider>
  );
};

RootRoute.propTypes = {
  location: PropTypes.shape().isRequired,
  appLoading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  restoreUser: PropTypes.func.isRequired,
};

export default withRouter(
  withContext(
    ([
      {
        app: { loading },
        user: { loggedIn },
      },
      dispatch,
    ]) => ({
      // state
      loggedIn,
      appLoading: loading,
      // actions
      restoreUser: (data) => restoreUserAction(data, dispatch),
      updateProfile: (data) => profileUpdateAction(data, dispatch),
    }),
    RootRoute
  )
);
