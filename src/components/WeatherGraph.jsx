import React from "react";
import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip"; // Import the custom tooltip component

// modified it to adapt to either daily data (using the 'date' property) or hourly data (using the 'time' property).
// allows convertion of temp unit
const WeatherGraph = ({ data, isFahrenheit }) => {
  // Determine whether the data is daily or hourly by checking for a 'date' property.
  const xKey = data.length > 0 && data[0].date ? "date" : "time";
  
  // Function to convert Celsius to Fahrenheit.
  // Ensure that the input is treated as a number using parseFloat.
  const convertTemp = (temp) => {
    const numTemp = parseFloat(temp);
    return isFahrenheit ? (numTemp * 9) / 5 + 32 : numTemp;
  };
  
  // Convert the temperature values if needed.
  const convertedData = data.map((entry) => ({
    ...entry,
    temperature: convertTemp(entry.temperature).toFixed(1),
    minTemp: entry.minTemp !== undefined ? convertTemp(entry.minTemp).toFixed(1) : undefined,
    maxTemp: entry.maxTemp !== undefined ? convertTemp(entry.maxTemp).toFixed(1) : undefined,
  }));

  // Compute dynamic domain for YAxis based on the temperature values.
  const temps = convertedData.map(d => parseFloat(d.temperature));
  const minY = Math.min(...temps);
  const maxY = Math.max(...temps);
  // Add some padding (e.g., 5 units) to the computed domain.
  const yDomain = [minY - 5, maxY + 5];

  return (
    <Box sx={{ width: "100%", height: "50vh", padding: "1rem 0 0 0" }}>
      <ResponsiveContainer>
        <LineChart
          data={convertedData}
          margin={{ top: 20, right: 20, bottom: 66, left: 20 }}
        >
          {/* Draw the temperature line */}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#1976d2"
            strokeWidth={1.5}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey={xKey}
            tickFormatter={(value) => {
              // If the data is daily, format the date in a short format.
              if (xKey === "date") {
                return new Date(value).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                });
              }
              // For hourly data, extract the time portion from the ISO string.
              return value.substring(11, 16);
            }}
            angle={-45}
            textAnchor="end"
            padding={{ left: 20, right: 20 }}
          />
          {/* Set YAxis domain dynamically */}
          <YAxis domain={yDomain} />
          {/* Used CustomTooltip component to show detailed data on hover, pass isFahrenheit flag */}
          <Tooltip content={<CustomTooltip xKey={xKey} isFahrenheit={isFahrenheit} />} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherGraph;
