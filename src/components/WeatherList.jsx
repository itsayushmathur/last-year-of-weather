import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


// It dynamically labels the first column as "Date" for daily data or "Time" for hourly data.
const WeatherList = ({ data }) => {
  // Determine the label for the first column based on the structure of the data.
  const firstColumnLabel = data.length > 0 && data[0].date ? "Date" : "Time";

  return (
    <TableContainer component={Paper} sx={{ minHeight: '50vh', maxHeight: '50vh', marginBottom: '1rem', padding: '0 5rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{firstColumnLabel}</TableCell>
            <TableCell align="right">Temperature (°C)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {data[0].date ? entry.date : entry.time}
              </TableCell>
              <TableCell align="right">{entry.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherList;
