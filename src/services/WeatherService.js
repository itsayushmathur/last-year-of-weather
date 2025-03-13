
export const getLocations = async () => {
  // this api will return the list of cities in india
  const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: "India" }),
  });
  const result = await response.json();
  
  return result.data;
};

//now since weather data is available via latitude and longitude, we need to convert the city name to latitude and longitude
export const getWeatherDataByLocation = async (location) => {
  
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&country=IN`
  );
  const geoData = await geoResponse.json();
  if (!geoData.results || geoData.results.length === 0) {
    return [];
  }
  const { latitude, longitude } = geoData.results[0];

  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() - 1); // yesterday
  const endDate = endDateObj.toISOString().split("T")[0];
  const startDateObj = new Date(endDateObj);
  startDateObj.setFullYear(startDateObj.getFullYear() - 1);
  const startDate = startDateObj.toISOString().split("T")[0];

  //gets data for last 1 year
  const weatherResponse = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max&timezone=Asia%2FKolkata`
  );
  const weatherData = await weatherResponse.json();

  
  const dailyDates = weatherData.daily.time; // array of date strings
  const dailyTemps = weatherData.daily.temperature_2m_max; 

  const monthData = {};
  dailyDates.forEach((date, index) => {
    const d = new Date(date);
    //will format the months and years to shorter format
    const monthKey = d.toLocaleString("en-US", { month: "short", year: "numeric" });
    if (!monthData[monthKey]) {
      monthData[monthKey] = { totalTemp: 0, count: 0 };
    }
    monthData[monthKey].totalTemp += dailyTemps[index];
    monthData[monthKey].count += 1;
  });

  // Create the result array with the average temperature per month (rounded to 2 decimals)
  const result = Object.entries(monthData).map(([month, { totalTemp, count }]) => ({
    month,
    temperature: (totalTemp / count).toFixed(2),
  }));

 
  result.sort((a, b) => new Date(a.month) - new Date(b.month));

  return result;
};
