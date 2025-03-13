import dummyData from '../data/dummyData.json';

//export the names of locations in an array for the dropdown
export const getLocations = () => {
  return dummyData.locations.map((loc) => loc.name);
};

//export data for the selected location
export const getWeatherDataByLocation = (location) => {
  const locationData = dummyData.locations.find((loc) => loc.name === location);
  return locationData ? Promise.resolve(locationData.data) : Promise.resolve([]);
};
