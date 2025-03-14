import React from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import LocationSelector from "./LocationSelector";

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;

${'' /* makes the filters row responsive for smaller screens  */}
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LocationFilter = ({
  locations,
  selectedLocation,
  onLocationSelect,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  today,
}) => {
  return (
    <FiltersRow>
      {/* Location selector */}      
      <LocationSelector
        locations={locations}
        onSelect={onLocationSelect}
        selectedLocation={selectedLocation}
      />

      {/* Start date picker */}
      <TextField
        style={{ width: "100%" }}
        label="Start Date"
        type="date"
        value={startDate}
        onChange={onStartDateChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: today }} // Prevent future dates
      />
      {/* End date picker */}
      <TextField
        style={{ width: "100%" }}
        label="End Date"
        type="date"
        value={endDate}
        onChange={onEndDateChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: today }} // Prevent future dates
      />
    </FiltersRow>
  );
};

export default LocationFilter;
