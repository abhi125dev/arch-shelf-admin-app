import React from "react";
import PropTypes from "prop-types";
import { Popup } from "semantic-ui-react";

import "./style.scss";

const ColourTooltip = ({ items, header }) => {
  return (
    <div className="colour-tooltip">
      {header && <Popup.Header>{header}</Popup.Header>}
      <Popup.Content>
        {items.map((item) => (
          <div className="colour-item" key={item.colour}>
            <div
              className="colour-block"
              style={{ backgroundColor: item.colour }}
            />
            <div className="explanation">{item.explanation}</div>
          </div>
        ))}
      </Popup.Content>
    </div>
  );
};

ColourTooltip.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      colour: PropTypes.string.isRequired,
      explanation: PropTypes.string.isRequired,
    })
  ).isRequired,
  header: PropTypes.string,
};

ColourTooltip.defaultProps = {
  header: "",
};

export { ColourTooltip };
