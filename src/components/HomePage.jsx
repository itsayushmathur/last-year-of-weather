import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import LocationFilter from "./LocationFilter";
import WeatherGraph from "./WeatherGraph";
import WeatherList from "./WeatherList";
import { getLocations, getWeatherDataByLocation } from "../services/WeatherService";

// Styled Components
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
  color: rgb(183, 28, 222);
  margin-bottom: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
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

// HomePage Component
const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch available locations on mount
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

  // Fetch weather data when filters are set
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

  // Get today's date to prevent future date selection
  const today = new Date().toISOString().split("T")[0];

  return (
    <BackgroundContainer>
      <AppContainer>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/10127/10127236.png"
            alt="Weather Logo"
            style={{ height: "50px", marginBottom: "1rem" }}
          />
          <Title>Weather</Title>
        </div>

        {/* Filters */}
        <LocationFilter
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          today={today}
        />

        {/* Conditional Rendering Based on Filters/Data */}
        {!selectedLocation ? (
          <Message>Please select a location to proceed.</Message>
        ) : weatherData.length === 0 ? (
          <Message>
            Weather data not present for selected location or date range. Please
            change filters.
          </Message>
        ) : (
          <>
            <TabsContainer>
              <Tab
                selected={tabValue === 0}
                onClick={() => handleTabChange(0)}
              >
                Graph View
              </Tab>
              <Tab
                selected={tabValue === 1}
                onClick={() => handleTabChange(1)}
              >
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

export default HomePage;
