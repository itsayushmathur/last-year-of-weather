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
const WeatherGraph = ({ data }) => {
  // Determine whether the data is daily or hourly by checking for a 'date' property.
  const xKey = data.length > 0 && data[0].date ? "date" : "time";
  const yKey = "temperature";

  return (
    <Box sx={{ width: "100%", height: "50vh", padding: "1rem 0 0 0" }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 66, left: 20 }}
        >
          {/* Draw the temperature line */}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            strokeWidth={2}
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
            // interval={0} // Show all labels without skipping any.
          />
          {/* Added padding to ensure data is not cut off on the y-axis */}
          <YAxis dataKey={yKey} padding={{ top: 130, bottom: 60 }} />
          {/* Used CustomTooltip component to show detailed data on hover */}
          <Tooltip content={<CustomTooltip xKey={xKey} />} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherGraph;
