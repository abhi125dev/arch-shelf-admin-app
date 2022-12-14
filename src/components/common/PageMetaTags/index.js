import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const PageMetaTags = ({ title }) => (
  <Helmet>
    <title>{title} - Arch Shelf</title>
  </Helmet>
);

PageMetaTags.propTypes = {
  title: PropTypes.string.isRequired,
};

export { PageMetaTags };
