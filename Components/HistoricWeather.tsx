import React from "react";

// Components
import Block from "./Block";
import MeanTemp from "./Graphs/MeanTemp";
import Precipitation from "./Graphs/Precipitation";

const HistoricWeather = ({ records }) => {
  console.log("HistoricWeather", { records });
  return (
    <div>
      <MeanTemp data={records.temperature} />
      <Precipitation data={records.precipitation} />
    </div>
  );
};

export default HistoricWeather;
