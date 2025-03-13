import axios from "axios";

// this api will return the list of cities in india
export const getLocations = async () => {
  const response = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/cities",
    { country: "India" }
  );
   return response.data.data;
};

//now since weather data is available via latitude and longitude, we need to convert the city name to latitude and longitude
export const getWeatherDataByLocation = async (location, startDate, endDate) => {

  const geoResponse = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&country=IN`
  );
  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    return [];
  }
  const { latitude, longitude } = geoResponse.data.results[0];


  const weatherResponse = await axios.get(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`
  );
  const data = weatherResponse.data;

  const dailyDates = data.daily.time;
  const dailyTemps = data.daily.temperature_2m_max;

  const monthData = {};
  dailyDates.forEach((date, index) => {
    const d = new Date(date);
    const monthKey = d.toLocaleString("en-US", { month: "short", year: "numeric" });
    if (!monthData[monthKey]) {
      monthData[monthKey] = { totalTemp: 0, count: 0 };
    }
    monthData[monthKey].totalTemp += dailyTemps[index];
    monthData[monthKey].count += 1;
  });

  const result = Object.entries(monthData).map(([month, { totalTemp, count }]) => ({
    month,
    temperature: (totalTemp / count).toFixed(2),
  }));

  
  return result;
};
