import axios from "axios";

// Define a constant to hold all API endpoints. This way, if any endpoint changes,
// I only need to update it in one place.
const API_CONFIG = {
  LOCATIONS_URL: "https://countriesnow.space/api/v0.1/countries/cities",
  GEOCODING_URL: "https://geocoding-api.open-meteo.com/v1/search",
  ARCHIVE_URL: "https://archive-api.open-meteo.com/v1/archive"
};

// getLocations fetches a list of Indian cities by making a POST request.
// I use a POST here because the API requires the country to be provided in the body.
export const getLocations = async () => {
  const response = await axios.post(API_CONFIG.LOCATIONS_URL, { country: "India" });
  // Return the list of cities from the response data.
  return response.data.data;
};

// getWeatherDataByLocation is responsible for:
// 1. Converting the provided city name into geographic coordinates (latitude & longitude).
// 2. Based on the date range, fetching either hourly data (for a single day) or daily data (for multiple days).
export const getWeatherDataByLocation = async (location, startDate, endDate) => {
  // Call the geocoding API to convert the city name into latitude and longitude.
  const geoResponse = await axios.get(
    `${API_CONFIG.GEOCODING_URL}?name=${encodeURIComponent(location)}&country=IN`
  );

  // If no geocoding results are returned, log a message and return an empty array.
  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    return [];
  }
  const { latitude, longitude } = geoResponse.data.results[0];

  // Check if the user has selected a single day by comparing startDate and endDate.
  if (startDate === endDate) {
    // For a single day selection, I fetch hourly weather data.
    // Construct the URL for the hourly API call.
    const url = `${API_CONFIG.ARCHIVE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m&timezone=Asia%2FKolkata`;
    console.log("Fetching hourly weather data from:", url);
    const weatherResponse = await axios.get(url);
    const data = weatherResponse.data;
    
    // Ensure the response contains hourly data. If not, log an error and return an empty array.
    if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
      console.error("Hourly data not found in response:", data);
      return [];
    }
    
    // Extract the hourly times and temperature values.
    const hourlyTimes = data.hourly.time;
    const hourlyTemps = data.hourly.temperature_2m;
    // Map each hour into an object with time and temperature.
    const result = hourlyTimes.map((time, index) => ({
      time, // Hour of observation.
      temperature: hourlyTemps[index] // Temperature at that hour.
    }));
    return result;
  } else {
    // For a range of dates (more than one day), fetch daily weather data.
    // Here I request both the maximum and minimum temperatures.
    const url = `${API_CONFIG.ARCHIVE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;
    console.log("Fetching daily weather data from:", url);
    const weatherResponse = await axios.get(url);
    const data = weatherResponse.data;
    const dailyDates = data.daily.time;
    // For each day, calculate the average temperature from max and min values.
    const result = dailyDates.map((date, index) => {
      const avgTemp = (
        (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2
      ).toFixed(2);
      return { date, temperature: avgTemp };
    });
    return result;
  }
};
