import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import FeedForm from "../../../FeedForm";

const AddCompetitions = () => {
  return (
    <>
      <div className="content-panel">
        <FeedForm
          pageType="competitions"
          pageName="Competition"
          allPageUrl="/competitions"
        />
      </div>
    </>
  );
};

AddCompetitions.propTypes = {
  AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddCompetitions
);
