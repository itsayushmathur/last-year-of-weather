import React from 'react';
import { Box } from '@mui/material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const WeatherGraph = ({ data }) => {
  return (
    <Box sx={{ width: '100%', height: '50vh' }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherGraph;
