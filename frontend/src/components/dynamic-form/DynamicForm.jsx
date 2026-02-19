import { TextField, MenuItem, Box, Autocomplete, Chip } from "@mui/material";
import PropTypes from "prop-types";
import DurationField from "./DurationField";

const normalizeOption = (option) => {
  if (typeof option === "object" && option !== null) {
    return {
      label: option.label,
      value: option.value,
    };
  }

  return {
    label: option,
    value: option,
  };
};

const DynamicForm = ({ fields, values, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map((field) => {
        if (field.type === "async-select") {
          return (
            <Autocomplete
              required={field.required}
              key={field.name}
              options={field.options || []}
              getOptionLabel={(opt) => opt.label}
              value={
                (field.options || []).find(
                  (o) => o.value === values[field.name],
                ) || null
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

        if (field.type === "multiselect") {
          const options = (field.options || []).map(normalizeOption);
          const selectedValues = Array.isArray(values[field.name])
            ? values[field.name]
            : [];
          const selectedOptions = options.filter((option) =>
            selectedValues.includes(option.value),
          );

          return (
            <Autocomplete
              key={field.name}
              multiple
              options={options}
              value={selectedOptions}
              getOptionLabel={(opt) => opt.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(e, selected) =>
                onChange({
                  target: {
                    name: field.name,
                    value: selected.map((item) => item.value),
                  },
                })
              }
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={`${field.name}-${option.value}`}
                    label={option.label}
                    size="small"
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  fullWidth
                />
              )}
            />
          );
        }

        if (field.type === "select") {
          return (
            <TextField
              key={field.name}
              select
              {...field}
              value={values[field.name] || ""}
              required={field.required}
              onChange={onChange}
              fullWidth
            >
              {(field.options || []).map((opt) => {
                const option = normalizeOption(opt);
                return (
                  <MenuItem key={option.value} value={option.value || ""}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </TextField>
          );
        }

        if (field.type === "time") {
          return (
            <DurationField
              key={field.name}
              onChange={(val) =>
                onChange({
                  target: {
                    name: field.name,
                    value: val,
                  },
                })
              }
            />
          );
        }

        return field.type === "file" ? (
          <TextField
            type="file"
            name={field.name}
            onChange={onChange}
            key={field.name}
            required={field.required}
          />
        ) : (
          <TextField
            type={field.type || "text"}
            multiline={field.multiline || false}
            rows={field.rows || 1}
            name={field.name}
            label={field.label}
            value={values[field.name || ""] || ""}
            onChange={onChange}
            key={field.name}
            required={field.required}
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
    }),
  ).isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DynamicForm;
