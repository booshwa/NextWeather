import React from "react";

// MUI
import { Typography } from "@mui/material";

// Libraries
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Components
import Block from "../Block";

const MeanTemp = ({ data }) => {
  return (
    <Block>
      <Typography variant="subtitle1" gutterBottom>
        <b>Min/Mean/Max Temperatures for Last 2 weeks (&deg;F)</b>
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Min"
            stroke="#1D4099"
            strokeWidth={2} 
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Mean"
            stroke="#235B19"
            strokeWidth={2} 
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Max"
            stroke="#85424F"
            strokeWidth={2} 
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Block>
  );
};

export default MeanTemp;
