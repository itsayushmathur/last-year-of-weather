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
    <Box sx={{ width: '100%', height: '40vh' }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ bottom: 50 }}>
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => value.substring(0, 3)} //this shortens the month names
            angle={-90}
            textAnchor="end"
            padding={{ left: 20, right: 20 }} //will provide padding so that the first entry doesn't combine to the axis
            interval={0} //this ensured that there are no gaps in the labels.
          />
          <YAxis/>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherGraph;
