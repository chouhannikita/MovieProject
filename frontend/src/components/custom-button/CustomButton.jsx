import { Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  variant = "contained",
  customClass = "",
  buttonText = "",
  type = "button",
  sx = {},
  loader = false,
}) => {
  return (
    <Button
      loading={loader}
      variant={variant}
      className={`${customClass} p-3 rounded-lg text-lg font-semibold transition`}
      sx={sx}
      type={type}
    >
      {buttonText}
    </Button>
  );
};

CustomButton.propTypes = {
  variant: PropTypes.string,
  customClass: PropTypes.string,
  buttonText: PropTypes.string,
  type: PropTypes.string,
  sx: PropTypes.object,
  loader: PropTypes.bool,
};

export default CustomButton;
