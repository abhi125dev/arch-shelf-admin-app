import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import FeedForm from "../../../FeedForm";

const AddFounder = () => {
  return (
    <>
      <div className="content-panel">
        <FeedForm
          pageType="founder"
          pageName="Founder article"
          allPageUrl="/founders"
        />
      </div>
    </>
  );
};

AddFounder.propTypes = {
  AddFounder: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(([{ user }]) => ({}), AddFounder);
