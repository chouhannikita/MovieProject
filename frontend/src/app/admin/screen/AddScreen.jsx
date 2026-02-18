import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "@/app/hooks/useForm";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import Modal from "@/components/model/Model";
import PropTypes from "prop-types";
import { screenFormFields } from "../adminConfig";
import { addScreen } from "@/api/screen/screen";
import { getAdminTheatres } from "@/api/theatre/theatre";
import { useSnackbar } from "@/context/SnackbarContext";

const INITIAL_VALUES = {
  name: "",
  totalSeats: "",
  theatreId: "",
};

const AddScreen = ({ open, handleClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [loadingTheatres, setLoadingTheatres] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const { values, handleChange, resetForm } = useForm(INITIAL_VALUES);
  const { showSnackbar } = useSnackbar();

  const loadTheatres = useCallback(async () => {
    setLoadingTheatres(true);
    try {
      const res = await getAdminTheatres();
      const data = (res?.data?.data || []).map((d) => ({
        label: d.name,
        value: d._id,
      }));
      setTheatres(data);
    } catch (error) {
      showSnackbar("Failed to load theatres", "error");
    } finally {
      setLoadingTheatres(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    if (open) {
      loadTheatres();
    }
  }, [open, loadTheatres]);


  const handleScroll = (e) => {
    if (loadingTheatres) return;
    const listbox = e.currentTarget;
    if (listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10) {
      // Backend currently returns full theatre list for admin in one request.
      // Keeping this for compatibility with async-select signature.
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addScreen(values);
      if (res?.data?.success) {
        showSnackbar("Screen added successfully", "success");
        resetForm();
        handleClose();
        onSuccess();
      } else {
        showSnackbar(
          res?.response?.data?.message || "Failed to add screen",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Add Screen"
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Add Screen"
      loading={loading}
    >
      <DynamicForm
        fields={screenFormFields({ handleScroll, theatreOptions: theatres })}
        values={values}
        onChange={handleChange}
      />
    </Modal>
  );
};

AddScreen.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default AddScreen;
