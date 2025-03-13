import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Container as MuiContainer } from "@mui/material";
import LocationSelector from "./components/LocationSelector";
import WeatherGraph from "./components/WeatherGraph";
import WeatherList from "./components/WeatherList";
import {
  getLocations,
  getWeatherDataByLocation,
} from "./services/WeatherService";

const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  margin: 2rem auto;
  max-width: 800px;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const Tab = styled.button`
  flex: 1;
  font-family: "sans-serif", sans-serif;
  font-size: 1.2rem;
  padding: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: ${(props) => (props.selected ? "2px solid #0087d5" : "none")};
  color: ${(props) => (props.selected ? "#0087d5" : "inherit")};
  outline: none;

  &:hover {
    background-color: #0087d5;
    border-radius: 1rem 1rem 0 0;
    color: white;
  }

  @media (max-width: 767px) {
    padding: 1.5rem;
    font-size: 0.9em;
  }
`;

const App = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  // fetch location when the page loads
  useEffect(() => {
    const locs = getLocations();
    setLocations(locs);
    if (locs.length > 0) {
      setSelectedLocation(locs[0]);
    }
  }, []);

  //fetch weather data for the selected location
  useEffect(() => {
    if (selectedLocation) {
      getWeatherDataByLocation(selectedLocation)
        .then((data) => setWeatherData(data))
        .catch((err) => console.error("Error fetching weather data:", err));
    }
  }, [selectedLocation]);

  const handleTabChange = useCallback((index) => {
    setTabValue(index);
  }, []);

  return (
    <MuiContainer maxWidth="md" sx={{ py: 4 }}>
      <h1 style={{ textAlign: "center" }}>Last Year of Weather</h1>
      {/* a location dropdown menu */}
      <LocationSelector locations={locations} onSelect={setSelectedLocation} />
      <Container>
        {/*will use tabs to switch between the graph view and list view for convenience */}
        <TabsContainer>
          <Tab selected={tabValue === 0} onClick={() => handleTabChange(0)}>
            Graph View
          </Tab>
          <Tab selected={tabValue === 1} onClick={() => handleTabChange(1)}>
            List View
          </Tab>
        </TabsContainer>
        <div>
          {tabValue === 0 && <WeatherGraph data={weatherData} />}
          {tabValue === 1 && <WeatherList data={weatherData} />}
        </div>
      </Container>
    </MuiContainer>
  );
};

export default App;
