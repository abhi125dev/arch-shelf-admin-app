import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { withContext } from "Context";
import { student } from "./routes";
import { STUDENT } from "../../../constants";

const SideBar = ({ showSideBar, setShowSideBar, user }) => {
  const [routes, setRoutes] = useState([]);
  const sidebarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSideBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarRef]);

  const allroutes = { student };

  useEffect(() => {
    if (user) {
      setRoutes(allroutes.student);
    }
  }, [user]);

  const location = useLocation();

  const renderChildren = (children) => {
    if (!user.year_group && user.role_slug === STUDENT) return;

    if (user.role_slug === STUDENT) {
      return (
        <ul>
          {children[user.year_group].map((childRoute) => (
            <Link
              className={
                location.pathname === childRoute.path ? "selected" : ""
              }
              to={childRoute.path}
            >
              {childRoute.name}
            </Link>
          ))}
        </ul>
      );
    }
    return (
      <ul>
        {children.map((childRoute) => (
          <Link
            className={location.pathname === childRoute.path ? "selected" : ""}
            to={childRoute.path}
          >
            {childRoute.name}
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={classNames("left-panel", showSideBar && "slide")}
    >
      <ul className="left-menu">
        {(routes || []).map((route) => (
          <li key={route.path}>
            <Link
              className={location.pathname === route.path ? "selected" : ""}
              to={route.path}
            >
              <span>
                <i className={classNames("fas", route.icon)} />
              </span>
              {route.name}
            </Link>

            {route.children && renderChildren(route.children)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withContext(([{ user }]) => ({ user }), SideBar);
