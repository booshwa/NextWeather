import React, { useEffect, useState } from "react";

// NexJS
import Head from "next/head";
import dynamic from "next/dynamic";

import {
  Typography,
  Chip,
  Box,
  Grid,
  Divider,
  Button,
  Container,
} from "@mui/material";

// Libraries
import { FetchTimezone, FetchHistoricWeather } from "../Components/FetchAPI";

// MUI Theme
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#275f9f" },
  },
  typography: {
    fontSize: 12.6, // 14px - 10% = 12.6px
  },
});

// Components
const Map = dynamic(() => import("../Components/Map"), {
  ssr: false,
});

import SiteHeader from "../Components/Header";
import LocationInfo from "../Components/LocationInfo";
import HistoricWeather from "../Components/HistoricWeather";

interface TimezoneData {
  abbreviation: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  dst: string;
  formatted: string;
  gmtOffset: number;
  message: string;
  nextAbbreviation: string;
  regionName: string;
  status: string;
  timestamp: number;
  zoneEnd: number;
  zoneName: string;
  zoneStart: number;
}

export default function Home() {
  const [site, setSite] = useState(null);
  const [timezoneData, setTimezoneData] = useState<TimezoneData>(null);
  const [historicData, setHistoricData] = useState(null);

  // console.log({
  //   site,
  //   timezoneData,
  //   historicData,
  // });

  useEffect(() => {
    if (site) {
      // declare the data fetching function
      const fetchData = async () => {
        // Fetch data from Timezone API
        setTimezoneData(await FetchTimezone(site));
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [site]);

  useEffect(() => {
    if (site && timezoneData && !historicData) {
      // declare the data fetching function
      const fetchData = async () => {
        // Fetch data from Timezone API
        setHistoricData(
          // @ts-ignore
          await FetchHistoricWeather(site, timezoneData.zoneName)
        );
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [timezoneData]);

  const clear = () => {
    setSite([]);
    setTimezoneData(null);
    setHistoricData(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <SiteHeader />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Container maxWidth="lg" style={{ paddingTop: "6em" }}>
          <Map site={site} setSite={setSite} clear={clear} />
          <Divider />
          <br />
          {timezoneData && <LocationInfo site={site} info={timezoneData} />}
          {historicData && <HistoricWeather records={historicData} />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
