import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";

const WeatherList = ({ data }) => {
  const firstColumnLabel = data.length > 0 && data[0].date ? "Date" : "Time";

  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "50vh", maxHeight: "50vh", marginBottom: "1rem" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              {firstColumnLabel}
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
              Min Temp (°C)
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
              Max Temp (°C)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
              <TableCell component="th" scope="row">
                {data[0].date
                  ? dayjs(entry.date).format("DD-MM-YYYY")
                  : dayjs(entry.time).format("HH:mm")}
              </TableCell>
              <TableCell align="right">{entry.minTemp}</TableCell>
              <TableCell align="right">{entry.maxTemp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherList;
