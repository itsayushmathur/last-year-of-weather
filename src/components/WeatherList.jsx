import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const WeatherList = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{minHeight: '50vh', maxHeight: '50vh', marginBottom: '1rem', padding: '0 5rem'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Temperature (°C)</TableCell>
            {/* <TableCell align="right">Humidity (%)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {entry.month}
              </TableCell>
              <TableCell align="right">{entry.temperature}</TableCell>
              {/* <TableCell align="right">{entry.humidity}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherList;
