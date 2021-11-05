import React from "react";
import PropTypes from "prop-types";

import "./style.scss";
import { Icon, Popup } from "semantic-ui-react";

const colors = {
  primary: "#33AC2E",
  secondary: "#E3B02A",
};

const ProgressBar = ({
  title,
  percents,
  inDays,
  color,
  inactiveBg,
  position,
  style,
  titleStyle,
  tooltip,
}) => {
  const tooltipEl =
    typeof tooltip === "string" ? (
      <Popup
        hoverable
        content={tooltip}
        position="bottom center"
        trigger={<Icon name="info circle" size="large" />}
      />
    ) : (
      tooltip
    );

  const titleElement =
    title || percents ? (
      <span className="label-bar" style={titleStyle}>
        {title} {!inDays && `${percents}%`} {tooltipEl}
      </span>
    ) : null;

  return (
    <div className="progress-bar" style={style}>
      {position === "top" && titleElement}
      <div className="bar" style={{ backgroundColor: inactiveBg }}>
        <div
          className="progress"
          style={{ width: `${percents}%`, backgroundColor: colors[color] }}
        />
      </div>
      {position === "bottom" && titleElement}
    </div>
  );
};

ProgressBar.propTypes = {
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  percents: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inDays: PropTypes.bool,
  color: PropTypes.string,
  inactiveBg: PropTypes.string,
  position: PropTypes.string,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
};

ProgressBar.defaultProps = {
  title: null,
  percents: 0,
  inDays: false,
  color: "primary",
  tooltip: null,
  inactiveBg: "#fff",
  position: "top",
  style: {},
  titleStyle: {},
};

export { ProgressBar };
