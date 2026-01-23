import PropTypes from "prop-types";
import Modal from "@/components/model/Model";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import { theatreFormFields } from "../adminConfig";
import { useAddTheatre } from "@/app/hooks/useAddTheatre";
import { useForm } from "@/app/hooks/useForm";

const INITIAL_VALUES = {
  name: "",
  city: "",
  address: "",
  status: "ACTIVE",
};

const AddTheatre = ({ open, handleClose }) => {
  const { values, handleChange, resetForm } = useForm(INITIAL_VALUES);
  const { submit, loading } = useAddTheatre(() => {
    resetForm();
    handleClose();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(values);
  };

  return (
    <Modal
      open={open}
      title="Add Theatre"
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Add Theatre"
      loading={loading}
    >
      <DynamicForm
        fields={theatreFormFields}
        values={values}
        onChange={handleChange}
      />
    </Modal>
  );
};

AddTheatre.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTheatre;
