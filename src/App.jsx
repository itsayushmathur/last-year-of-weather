import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Container as MuiContainer,
  TextField,
  Typography,
} from "@mui/material";
import LocationSelector from "./components/LocationSelector";
import WeatherGraph from "./components/WeatherGraph";
import WeatherList from "./components/WeatherList";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";

import {
  getLocations,
  getWeatherDataByLocation,
} from "./services/WeatherService";

const BackgroundContainer = styled.div`
  background: url("https://wallpapers.com/images/featured/amoled-jz9qn9jzrcg8ai6k.jpg")
    no-repeat center center fixed;
  min-height: 100vh;
  background-size: cover;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div`
  background: #fff;
  padding: 0 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  justify-content: center;
  align-items: center;
  ${"" /* font-size: 2rem; */}
  color: rgb(183, 28, 222);
  margin-bottom: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  ${'' /* border-bottom: 2px solid #9c27b0; */}
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.selected ? "0.1rem solid rgb(190, 101, 205)" : "none"};
  color: ${(props) => (props.selected ? "#9c27b0" : "#555")};
  transition: 0.3s;

  &:hover {
    background: rgb(201, 94, 220);
    color: white;
    border-radius: 8px 8px 0 0;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  font-weight: bold;
  margin-top: 1rem;
`;

const App = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locs = await getLocations();
        setLocations(locs);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation && startDate && endDate) {
      const fetchWeather = async () => {
        try {
          const data = await getWeatherDataByLocation(
            selectedLocation,
            startDate,
            endDate
          );
          setWeatherData(data);
        } catch (err) {
          console.error("Error fetching weather data:", err);
        }
      };
      fetchWeather();
    }
  }, [selectedLocation, startDate, endDate]);

  const handleTabChange = useCallback((index) => {
    setTabValue(index);
  }, []);

  return (
    <BackgroundContainer>
      <AppContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/10127/10127236.png"
            alt="Weather Logo"
            style={{ height: "50px", marginBottom: "1rem" }}
          />
          <Title>Weather</Title>
        </div>

        {/* <Typography variant="h6" style={{ color: "#9c27b0" }}>
          Select Location:
        </Typography> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <LocationSelector
            locations={locations}
            onSelect={setSelectedLocation}
          />

          {/* <Typography
          variant="h6"
          style={{ color: "#9c27b0", marginBottom: "1rem" }}
        >
          Select Date Range:
        </Typography> */}
          <div style={{ display: "flex", gap: "1rem"}}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>

        {!selectedLocation ? (
          <Message>Please Select a location to proceed.</Message>
        ) : weatherData.length === 0 ? (
          <Message>
            Weather data not present for selected location or date range. Please
            change filters.
          </Message>
        ) : (
          <>
            <TabsContainer>
              <Tab selected={tabValue === 0} onClick={() => handleTabChange(0)}>
                Graph View
              </Tab>
              <Tab selected={tabValue === 1} onClick={() => handleTabChange(1)}>
                List View
              </Tab>
            </TabsContainer>
            {tabValue === 0 ? (
              <WeatherGraph data={weatherData} />
            ) : (
              <WeatherList data={weatherData} />
            )}
          </>
        )}
      </AppContainer>
    </BackgroundContainer>
  );
};

export default App;
