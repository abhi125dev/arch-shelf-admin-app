import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import classnames from "classnames";
import _ from "lodash";

import { menuLinks } from "Constants";
import { withContext } from "Context";
import { openLeftNav } from "Actions/appActions";

import "./style.scss";

import ClickLogo from "../../../assets/images/logo-small.png";
import { allRoles } from "Utils/roles";
import ZohoButton from "../ZohoButton";

const _LeftMenu = ({
  openMenu,
  userRole,
  openLeftNav,
  userRoleType,
  location,
}) => {
  if (location.pathname === "/matrix") {
    return false;
  }
  return (
    <div className={classnames("left-menu", { open: openMenu })}>
      <div className="menu-wrap">
        <div className="menu-item has-customer-logo"></div>
        {_.map(
          menuLinks,
          (item) =>
            _.find(item.show[userRoleType], ["id", userRole]) && (
              <div key={item.name} className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="link"
                  to={item.path}
                  onClick={() => openLeftNav(false)}
                >
                  <i className={item.icon} />
                  <span>{item.name}</span>
                </NavLink>
              </div>
            )
        )}
      </div>
      <div className="menu-item help-center">
        <ZohoButton />
      </div>
      <div className="bottom-logo">
        <img src={ClickLogo} alt="" />
        <p className="bottom-logo-copyright">&copy; Green Hedge Capital</p>
      </div>
    </div>
  );
};

_LeftMenu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  userRole: PropTypes.number.isRequired,
  userRoleType: PropTypes.oneOf(Object.keys(allRoles)).isRequired,
  openLeftNav: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const LeftMenu = withRouter(
  withContext(
    ([
      {
        app: { openMenu },
        user: {
          account: { role, roleType },
        },
      },
      dispatch,
    ]) => ({
      // state
      openMenu,
      userRole: role,
      userRoleType: roleType,
      // actions
      openLeftNav: (data) => openLeftNav(data, dispatch),
    }),
    _LeftMenu
  )
);

export { LeftMenu };
