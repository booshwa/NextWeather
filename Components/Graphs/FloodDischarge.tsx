import React from "react";

// MUI
import { Typography } from "@mui/material";

// Libraries
import moment from "moment";
import {
  LineChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Components
import Block from "../Block";

const FloodDischarge = ({ data }) => {
  return (
    <Block>
      <Typography variant="subtitle1" gutterBottom>
        <b>River Discharge (Last 7 Days and 3 Month Prediction)</b>
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
          <ReferenceLine
            x={moment().format("M/D/YY")}
            stroke="white"
            label="Today"
          />
          <Line
            type="monotone"
            dataKey="Discharge"
            stroke="#1D4099"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Discharge Min"
            stroke="#235B19"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Discharge Mean"
            stroke="#50D3AE"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Discharge Median"
            stroke="#85424F"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Discharge Max"
            stroke="#D6972C"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Block>
  );
};

export default FloodDischarge;
