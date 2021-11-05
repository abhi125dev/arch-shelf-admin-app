import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import FeedForm from "../../../FeedForm";

const AddResource = () => {
  return (
    <>
      <div className="content-panel">
        <FeedForm
          pageType="resources"
          pageName="Resource"
          allPageUrl="/resources"
        />
      </div>
    </>
  );
};

AddResource.propTypes = {
  AddBlog: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(([{ user }]) => ({}), AddResource);
