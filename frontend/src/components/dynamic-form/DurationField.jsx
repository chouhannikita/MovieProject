import React, { useState, useEffect, useRef } from "react";
import { TextField, Box, Typography } from "@mui/material";

const DurationField = ({ onChange }) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const totalMinutes =
      (Number(hours) || 0) * 60 + (Number(minutes) || 0);

    if (onChangeRef.current) {
      onChangeRef.current(totalMinutes);
    }
  }, [hours, minutes]);

  const handleMinutesChange = (value) => {
    if (value <= 59) {
      setMinutes(value);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Movie Duration
      </Typography>

      <Box display="flex" gap={2}>
        <TextField
          label="Hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          inputProps={{ min: 0 }}
          fullWidth
        />

        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => handleMinutesChange(e.target.value)}
          inputProps={{ min: 0, max: 59 }}
          error={minutes > 59}
          helperText={minutes > 59 ? "Must be between 0-59" : ""}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default DurationField;
