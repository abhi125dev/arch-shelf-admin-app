import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import ProjectForm from "../../../ProjectForm";

const AddProjects = () => {
  return (
    <>
      <div className="content-panel">
        <ProjectForm
          pageType="projects"
          pageName="Project"
          allPageUrl="/projects"
        />
      </div>
    </>
  );
};

AddProjects.propTypes = {
  AddInitiative: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddProjects
);
