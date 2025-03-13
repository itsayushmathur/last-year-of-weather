import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

const LocationSelector = ({ locations, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ my: 2, minWidth: 120 }}>
      <Autocomplete
        options={locations}
        onInputChange={(event, value) => {
          // Open the dropdown only if there's input
          setOpen(value.length > 0);
        }}
        onChange={(event, newValue) => {
          onSelect(newValue);
        }}
        open={open}
        onClose={() => setOpen(false)}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" />
        )}
      />
    </Box>
  );
};

export default LocationSelector;
