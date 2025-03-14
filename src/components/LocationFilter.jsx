import React from "react";
import { TextField, Box } from "@mui/material";
import styled from "styled-components";
import LocationSelector from "./LocationSelector";

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;

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
      <LocationSelector
        locations={locations}
        onSelect={onLocationSelect}
        selectedLocation={selectedLocation}
      />
      <TextField
        style={{ width: "100%" }}
        label="Start Date"
        type="date"
        value={startDate}
        onChange={onStartDateChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: today }}
      />
      <TextField
        style={{ width: "100%" }}
        label="End Date"
        type="date"
        value={endDate}
        onChange={onEndDateChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: today }}
      />
    </FiltersRow>
  );
};

export default LocationFilter;
