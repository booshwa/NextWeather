import React from "react";

import { Typography } from "@mui/material";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Block from "../Block";

const Precipitation = ({ data }) => {
  return (
    <Block>
      <Typography variant="subtitle1" gutterBottom>
        <b>Precipitation for Last 2 weeks (&deg;F)</b>
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis domain={[0, "dataMax + 0.02"]} />
          <Tooltip cursor={false} />
          <Legend />
          <Bar dataKey="Rain" stackId="a" fill="#345777" />
          <Bar dataKey="Snow" stackId="a" fill="#CCCCCC" />
        </BarChart>
      </ResponsiveContainer>
    </Block>
  );
};

export default Precipitation;
