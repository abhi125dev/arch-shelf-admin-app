import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import ForgotPassword from "./ForgortPassword";
import LoginForm from "./LoginForm";
import PasswordUpdate from "./PasswordUpdate";
import RegisterForm from "./RegisterForm";

import "./style.scss";

const Login = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/registration" component={RegisterForm} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/update-password" component={PasswordUpdate} />
    <Redirect to="/login" />
  </Switch>
);

export default withRouter(Login);
