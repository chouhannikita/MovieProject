import React, { useEffect, useState } from "react";
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
};

const AddScreen = ({ open, handleClose,onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [theatres, setTheatres] = useState([]);
  const { values, handleChange, resetForm } = useForm(INITIAL_VALUES);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    loadTheatres();
  }, []);

  const loadTheatres = async () => {
    const res = await getAdminTheatres({ page, limit: 10 });
    const data = res?.data?.data?.map((d) => ({
      label: d.name,
      value: d._id,
    }));
    setTheatres((prev) => {
      const map = new Map();

      [...prev, ...data].forEach((item) => {
        map.set(item.value, item);
      });

      return Array.from(map.values());
    });

    setPage((p) => p + 1);
  };

  const handleScroll = (e) => {
    const listbox = e.currentTarget;
    if (listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10) {
      loadTheatres();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addScreen(values);
    if (res?.data?.success) {
      showSnackbar("Screen added successfully", "success");
      resetForm();
      handleClose();
      onSuccess()
    } else {
      showSnackbar(
        res?.response?.data?.message || "Failed to add screen",
        "error"
      );
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
};

export default AddScreen;
