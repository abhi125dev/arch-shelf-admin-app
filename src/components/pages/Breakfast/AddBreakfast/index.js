import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import FeedForm from "../../../FeedForm";

const AddBreakfast = () => {
  return (
    <>
      <div className="content-panel">
        <FeedForm
          pageType="breakfasts"
          pageName="Over-Breakfast"
          allPageUrl="/breakfast"
        />
      </div>
    </>
  );
};

AddBreakfast.propTypes = {
  AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddBreakfast
);
