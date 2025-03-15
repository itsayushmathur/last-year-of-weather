import React from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";

// set a custom tooltip for graph instead of showing the default values.
const CustomTooltip = ({ active, payload, label, xKey, isFahrenheit }) => {
  if (active && payload && payload.length) {
    // Extract temperature details from payload
    const { temperature, minTemp, maxTemp } = payload[0].payload;
    return (
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "8px",
          borderRadius: "4px",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <div>
          <strong>{xKey === "date" ? "Date" : "Time"}:</strong>{" "}
          {(xKey === "date" ? dayjs(label).format("DD-MMM-YY") : dayjs(label).format("HH:mm")) || ""}
        </div>
        <div>
          <strong>Avg Temp:</strong> {temperature}°{isFahrenheit ? "F" : "C"}
        </div>
        <div>
          <strong>Min Temp:</strong> {minTemp}°{isFahrenheit ? "F" : "C"}
        </div>
        <div>
          <strong>Max Temp:</strong> {maxTemp}°{isFahrenheit ? "F" : "C"}
        </div>
      </Box>
    );
  }
  return null;
};

export default CustomTooltip;
