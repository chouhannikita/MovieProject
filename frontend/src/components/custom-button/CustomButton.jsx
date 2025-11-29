import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  variant = "contained",
  customClass = "",
  buttonText = "",
  type="button"
}) => {
  return (
    <Button
      variant={variant}
      className={`${customClass} p-3 rounded-lg text-lg font-semibold transition`}
      type={type}
    >
      {buttonText}
    </Button>
  );
};

export default CustomButton;
