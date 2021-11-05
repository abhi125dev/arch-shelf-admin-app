import React, { useState } from "react";
import { Redirect } from "react-router";
import Header from "../Header";
import SideBar from "../SideBar";

const ProLayout = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  if (children) {
    return (
      <section className="dashboard-wrapper">
        <div className="container mx-auto">
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          <div className="dashboard-body-wrapper">
            <SideBar
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
            />
            {children}
          </div>
        </div>
      </section>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProLayout;
