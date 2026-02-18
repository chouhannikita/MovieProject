import React, { useState } from "react";
import { useForm } from "@/app/hooks/useForm";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import Modal from "@/components/model/Model";
import PropTypes from "prop-types";
import { movieFormFields } from "../adminConfig";
import { useSnackbar } from "@/context/SnackbarContext";
import { addMovie } from "@/api/movie/movie";
import { useSelector } from "react-redux";

const INITIAL_VALUES = {
  title: "",
  duration: "",
  posterUrl: {},
  genre: [],
  language: [],
};

const AddMovie = ({ open, handleClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { values, handleChange, resetForm } = useForm(INITIAL_VALUES);
  const { showSnackbar } = useSnackbar();
  const adminId = useSelector((state) => state.auth.userData?.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, duration, posterUrl } = values;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("posterUrl", posterUrl);
    formData.append("adminId", adminId);
    formData.append("genre", JSON.stringify(values.genre));
    formData.append("language", JSON.stringify(values.language));
    formData.append("description", values.description || "");
    setLoading(true);
    const res = await addMovie(formData);

    if (res?.data?.success) {
      showSnackbar("Movie added successfully", "success");
      resetForm();
      onSuccess();
      handleClose();
    } else {
      showSnackbar(
        res?.response?.data?.message || "Failed to add movie",
        "error"
      );
    }
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      title="Add Movie"
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Add Movie"
      loading={loading}
    >
      <DynamicForm
        fields={movieFormFields()}
        values={values}
        onChange={handleChange}
      />
    </Modal>
  );
};

AddMovie.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddMovie;
