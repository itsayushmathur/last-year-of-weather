import React from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";

//set a cutom tooltip for graph instead of showing the default values. 
const CustomTooltip = ({ active, payload, label, xKey }) => {
  if (active && payload && payload.length) {
    // Extract temperature details from payload
    const { temperature, minTemp, maxTemp } = payload[0].payload;
    return (
      <Box
        // sx={{
        //   backgroundColor: "rgba(255, 255, 255, 0.9)",
        //   padding: "8px",
        //   borderRadius: "4px",
        //   boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        // }}
      >
        <div>
        <strong>{xKey === "date" ? "Date" : "Time"}:</strong> {(xKey === "date" ? dayjs(label).format("DD-MMM-YY") : dayjs(label).format("HH:mm")) || ""}

        </div>
        <div>
          <strong>Avg Temp:</strong> {temperature}°C
        </div>
        <div>
          <strong>Min Temp:</strong> {minTemp}°C
        </div>
        <div>
          <strong>Max Temp:</strong> {maxTemp}°C
        </div>
      </Box>
    );
  }
  return null;
};

export default CustomTooltip;
