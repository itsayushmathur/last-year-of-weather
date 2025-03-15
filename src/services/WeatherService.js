import axios from "axios";

//add constants for api urls so that it can be changed easily
const API_CONFIG = {
  LOCATIONS_URL: "https://countriesnow.space/api/v0.1/countries/cities",
  GEOCODING_URL: "https://geocoding-api.open-meteo.com/v1/search",
  ARCHIVE_URL: "https://archive-api.open-meteo.com/v1/archive"
};

//will fetch the list of cities inside india
//this is called from the locationSelector component to populate the dropdown.
export const getLocations = async () => {
  const response = await axios.post(API_CONFIG.LOCATIONS_URL, { country: "India" });
    return response.data.data;
};

//since the location cannot be sent as string to get weather data, will use another api to get the latittude and longitude of  sleected location
export const getWeatherDataByLocation = async (location, startDate, endDate) => {
  const geoResponse = await axios.get(
    `${API_CONFIG.GEOCODING_URL}?name=${encodeURIComponent(location)}&country=IN`
  );

  //will provide a message if the location is not found to console.
  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    console.log("Cannot find latitude and longitude for:", location);
    return [];
  }
  const { latitude, longitude } = geoResponse.data.results[0];

 //now we will check if we need to show data day wise or hourly
  if (startDate === endDate) { //if this returns turue, the user has selected a single day

    //we also need to checkif the user has sleected todays date because no data will be present for the current hours
    const today= new Date().toISOString().split('T')[0]; 
    if(startDate === today || endDate === today){
        alert("Please select a date in the past for hourly Data");
        return [];
    }
    const url = `${API_CONFIG.ARCHIVE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m&timezone=Asia%2FKolkata`;
    console.log("Fetching hourly weather data from:", url);
    const weatherResponse = await axios.get(url);
    const data = weatherResponse.data;
    
    //similar fallback response 
    if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
      console.error("Hourly data not found in response:", data);
      return [];
    }
    
   //we need only hour and its temperature so will store these in variables.
    const hourlyTimes = data.hourly.time;
    const hourlyTemps = data.hourly.temperature_2m;
    // need to map each hour into an object with time and temperature for each hour.
    const result = hourlyTimes.map((time, index) => ({
      time,
      temperature: hourlyTemps[index] 
    }));
    return result;
  } 

  //now if the above is not true, it means user has slected a range of days, so we will call the day wise api
  else {
   const url = `${API_CONFIG.ARCHIVE_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;
    const weatherResponse = await axios.get(url);
    const data = weatherResponse.data;
    const dailyDates = data.daily.time;
    //the response from the api has max and min temperature values. we will show the graph in single so we can get average of the two values
    const result = dailyDates.map((date, index) => {
      const avgTemp = (
        (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2
      ).toFixed(3);
      return { date, temperature: avgTemp, minTemp: data.daily.temperature_2m_min[index], maxTemp: data.daily.temperature_2m_max[index] };
    });
    return result;
  }
};
