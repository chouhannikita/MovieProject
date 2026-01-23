import { TextField, MenuItem, Box } from "@mui/material";

const DynamicForm = ({ fields, values, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <TextField
              key={field.name}
              select
              name={field.name}
              label={field.label}
              value={values[field.name]}
              onChange={onChange}
              fullWidth
            >
              {field.options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          );
        }

        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            value={values[field.name]}
            onChange={onChange}
            required={field.required}
            multiline={field.type === "textarea"}
            rows={field.rows || 1}
            fullWidth
          />
        );
      })}
    </Box>
  );
};

export default DynamicForm;
