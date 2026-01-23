'use client'
import { TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types"

const FormInput = ({
  label = "",
  variant = "outlined",
  value = "",
  onChange,
  type = "text",
  className = "",
  required=false,
  name="",
  slotProps={},
}) => {
  return (
    <div className="mb-2">

      <TextField
        id="outlined-basic"
        label={label}
        variant={variant}
        fullWidth
        value={value}
        className={className}
        onChange={onChange}
        type={type}
        required={required}
        name={name}
        slotProps={{ htmlInput: slotProps }} // Updated line
      />
    </div>
  );
};

FormInput.propType = {
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  slotProps: PropTypes.object,
}

export default FormInput;
