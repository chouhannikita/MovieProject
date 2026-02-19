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
  placeholder = "",
  multiline = false,
  rows = 1,
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
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        slotProps={{ htmlInput: slotProps }} // Updated line
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  slotProps: PropTypes.object,
  placeholder: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
}

export default FormInput;
