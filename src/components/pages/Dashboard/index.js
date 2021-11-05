import React from "react";
import { withContext } from "Context";
import MainDashboard from "./MainDashboard";
import { PageMetaTags } from "Common";
import "./style.scss";

const Dashboard = ({ user }) => {
  const component = () => {
    return <MainDashboard />;
  };

  return (
    <>
      <PageMetaTags title="Dashboard" />
      {component()}
    </>
  );
};

export default withContext(
  ([{ user }, dispatch]) => ({
    // state
    user,
  }),
  Dashboard
);
