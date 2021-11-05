import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import FeedForm from "../../../FeedForm";

const AddCourses = () => {
  return (
    <>
      <div className="content-panel">
        <FeedForm pageType="courses" pageName="Course" allPageUrl="/courses" />
      </div>
    </>
  );
};

AddCourses.propTypes = {
  AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddCourses
);
