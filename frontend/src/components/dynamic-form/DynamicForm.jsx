import { TextField, MenuItem, Box, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";

const DynamicForm = ({ fields, values, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map((field) => {
        if (field.type === "async-select") {
          return (
            <Autocomplete
              key={field.name}
              options={field.options}
              getOptionLabel={(opt) => opt.label}
              value={
                field.options.find((o) => o.value === values[field.name]) ||
                null
              }
              onChange={(e, val) =>
                onChange({
                  target: {
                    name: field.name,
                    value: val?.value || "",
                  },
                })
              }
              onScroll={field.onScroll}
              renderInput={(params) => (
                <TextField {...params} label={field.label} />
              )}
            />
          );
        }

        if (field.type === "select") {
          return (
            <TextField key={field.name} select {...field}>
              {field.options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          );
        }

        return field.type === "file" ? (
          <TextField
            type="file"
            name={field.name}
            onChange={onChange}
            key={field.name}
          />
        ) : (
          <TextField
            type="text"
            name={field.name}
            label={field.label}
            value={values[field.name]}
            onChange={onChange}
            key={field.name}
            fullWidth
          />
        );
      })}
    </Box>
  );
};

DynamicForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      options: PropTypes.array,
      onScroll: PropTypes.func,
    })
  ).isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DynamicForm;
