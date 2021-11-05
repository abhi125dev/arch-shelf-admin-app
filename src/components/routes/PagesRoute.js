import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

import { withContext } from "Context";
import { Routes, navigationRoutes } from "Constants";
import { Breadcrumbs } from "Common";
import { allRoles } from "Utils/roles";

const PagesRoute = ({ userRole, userRoleType }) => (
  <div className="container" id="pages-container">
    <Breadcrumbs />
    <Switch>
      {navigationRoutes.map((route) => {
        const Component = route.component;
        if (_.find(route.access[userRoleType], ["id", userRole]))
          return (
            <Route exact key={route.path} {...route} component={Component} />
          );
      })}
      <Redirect to={Routes.DASHBOARD} />
    </Switch>
  </div>
);

PagesRoute.propTypes = {
  userRole: PropTypes.number.isRequired,
  userRoleType: PropTypes.oneOf(Object.keys(allRoles)).isRequired,
};

export default withContext(
  ([
    {
      user: {
        account: { role, roleType },
      },
    },
  ]) => ({ userRole: role, userRoleType: roleType }),
  PagesRoute
);
