import React, { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

const LocationSelector = ({ locations, onSelect }) => {
  const [inputValue, setInputValue] = useState("");

  //removed the logic to open the dropdown only when user typed inside it. 
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Autocomplete
        options={locations}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={(event, newValue) => onSelect(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" />
        )}
      />
    </Box>
  );
};

export default LocationSelector;
