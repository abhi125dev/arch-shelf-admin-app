import React from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import FeedForm from "../../../FeedForm";

const AddProducts = () => {
  return (
    <>
      <div className="content-panel">
        <FeedForm
          pageType="products"
          pageName="Product"
          allPageUrl="/products"
        />
      </div>
    </>
  );
};

AddProducts.propTypes = {
  AddInitiative: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddProducts
);
