import React, { useCallback } from "react";
import PropTypes from "prop-types";

import "./IconButton.css";

function IconButton({ icon, onClick, data }) {
  const handleClick = useCallback(() => onClick(data), [data, onClick]);

  return (
    <span className={`icon-button icon-button_${icon}`} onClick={handleClick} />
  );
}

IconButton.propTypes = {
  /**
   * Modifier for the button icon
   */
  icon: PropTypes.oneOf([
    "add-folder",
    "add-file",
    "apply",
    "cancel",
    "delete",
    "rename-folder"
  ]),
  /**
   * Fire when click to button, can pass any data
   */
  onClick: PropTypes.func.isRequired,
  /**
   * This data will pass to onClick callback
   */
  data: PropTypes.any
};

export default IconButton;
