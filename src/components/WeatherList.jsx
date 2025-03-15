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

// now gets data and temp unit.
const WeatherList = ({ data, isFahrenheit }) => {
  // Determine the label for the first column based on the structure of the data.
  const firstColumnLabel = data.length > 0 && data[0].date ? "Date" : "Time";

  // Function to convert Celsius to Fahrenheit.
  const convertTemp = (temp) => (isFahrenheit ? (temp * 9) / 5 + 32 : temp);

  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "50vh", maxHeight: "50vh", marginBottom: "1rem" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#85a7d6" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
              {firstColumnLabel}
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Min Temp (°{isFahrenheit ? "F" : "C"})
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Max Temp (°{isFahrenheit ? "F" : "C"})
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow
              key={index}
              sx={{ backgroundColor: index % 2 === 0 ? "#e0e0e0" : "white" }}
            >
              <TableCell component="th" scope="row">
                {/* use dayjs to properly format the entries */}
                {data[0].date
                  ? dayjs(entry.date).format("DD-MMM-YYYY")
                  : dayjs(entry.time).format("HH:mm")}
              </TableCell>
              <TableCell align="right">
                {entry.minTemp !== undefined
                  ? convertTemp(entry.minTemp).toFixed(1)
                  : "-"}
              </TableCell>
              <TableCell align="right">
                {entry.maxTemp !== undefined
                  ? convertTemp(entry.maxTemp).toFixed(1)
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherList;
