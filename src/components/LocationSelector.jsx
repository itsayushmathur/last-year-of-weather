import React, { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

const LocationSelector = ({ locations, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  //will open the dropdown only the user types something
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    setOpen(newInputValue.length > 0);
  };

  return (
    <Box sx={{ my: 2, minWidth: 120 }}>
      <Autocomplete
        options={locations}
        inputValue={inputValue}
        open={open}
        onInputChange={handleInputChange}
        onClose={() => setOpen(false)}
        onChange={(event, newValue) => onSelect(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" />
        )}
      />
    </Box>
  );
};

export default LocationSelector;
