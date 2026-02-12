import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import CustomButton from "../custom-button/CustomButton";

const Modal = ({
  open,
  title,
  onClose,
  onSubmit,
  submitText = "Submit",
  children,
  maxWidth = "sm",
  fullWidth = true,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent dividers>{children}</DialogContent>

        <DialogActions>
          <CustomButton
            onClick={onClose}
            buttonText="Cancel"
            variant="outlined"
            type="button"
            sx={{ color: "secondary.main", borderColor: "secondary.main" }}
          />

          <CustomButton
            type="submit"
            variant="contained"
            buttonText={submitText}
            loader={loading}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Modal;
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
};
