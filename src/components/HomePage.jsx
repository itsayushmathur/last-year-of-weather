import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";
import LocationFilter from "./LocationFilter";
import WeatherGraph from "./WeatherGraph";
import WeatherList from "./WeatherList";
import {
  getLocations,
  getWeatherDataByLocation,
} from "../services/WeatherService";

// BackgroundContainer provides the full-page background styling.
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

// AppContainer wraps the main content and provides white background and a drop shadow.
const AppContainer = styled.div`
  background: #fff;
  padding: 0 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  width: 100%;
`;

// Title is the main header text.
const Title = styled.h1`
  text-align: center;
  color:rgb(0, 0, 0);
  margin-bottom: 1rem;
`;

// TabsContainer holds the tab buttons that let the user switch views.
const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

// Tab defines the style for each individual tab button.
const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.selected ? "0.1rem solid black" : "none"};
  color: ${(props) => (props.selected ? "black" : "#555")};
  transition: 0.3s;

  &:hover {
    background: black;
    color: white;
    border-radius: 8px 8px 0 0;
  }
`;

// Message is used to show prompts and error messages to the user.
const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  font-weight: bold;
  margin-top: 1rem;
`;

// HomePage is the central component managing the state and flow of the application.
// It fetches location data, manages user selections, and triggers weather API calls.
const HomePage = () => {
  // State variables to hold the list of locations, user-selected city, weather data,
  // the current view (Graph or List), and the date range.
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // On component mount, fetch the list of available locations.
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

  // When the user selects a location and date range, fetch the corresponding weather data.
  useEffect(() => {
    if (selectedLocation && startDate && endDate) {
      const fetchWeather = async () => {
        try {
          // getWeatherDataByLocation returns either hourly or daily data based on the dates.
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

  // Handler to switch between the Graph and List views.
  const handleTabChange = useCallback((index) => {
    setTabValue(index);
  }, []);

  // I restrict the date picker to not allow future dates.
  const today = new Date().toISOString().split("T")[0];

  return (
    <BackgroundContainer>
      <AppContainer>
        {/* Header section containing the logo and application title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/10127/10127236.png"
            alt="Weather Logo"
            style={{ height: "50px", marginBottom: "1rem" }}
          />
          <Title>Weather</Title>
        </div>

        {/* Render the LocationFilter component that contains the location and date pickers */}
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
        <Typography
          variant="body1"
          style={{
            color: "red",
            marginBottom: "1rem",
            fontSize: "0.7rem",
            justifySelf: "end",
          }}
        >
          *Select same dates for start and end dates to get hourly data.
        </Typography>

        {/* Depending on the user’s selections, either prompt for more input or display weather data */}
        {!selectedLocation ? (
          <Message>Please select a location to proceed.</Message>
        ) : weatherData.length === 0 ? (
          <Message>
            Weather data not present for selected location or date range. Please
            change filters.
          </Message>
        ) : (
          <>
            {/* Tab navigation to toggle between different views */}
            <TabsContainer>
              <Tab selected={tabValue === 0} onClick={() => handleTabChange(0)}>
                Graph View
              </Tab>
              <Tab selected={tabValue === 1} onClick={() => handleTabChange(1)}>
                List View
              </Tab>
            </TabsContainer>
            {/* Render either the WeatherGraph or WeatherList component based on the active tab */}
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
