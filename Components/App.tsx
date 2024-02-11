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
import {
  FetchTimezone,
  FetchHistoricWeather,
  FetchFlood,
} from "../Components/FetchAPI";
import { useWindowSize } from "usehooks-ts";

// MUI Theme
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import Block from "../Components/Block";
import SiteHeader from "../Components/Header";
import LocationInfo from "../Components/LocationInfo";
// import HistoricWeather from "../Components/HistoricWeather";
import Map from "./Map";
import MeanTemp from "./Graphs/MeanTemp";
import Precipitation from "./Graphs/Precipitation";
import FloodDischarge from "./Graphs/FloodDischarge";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#275f9f" },
  },
  typography: {
    fontSize: 12.6, // 14px - 10% = 12.6px
  },
});

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

export default function App() {
  const {
    width = typeof window !== "undefined" ? window.innerWidth : 0,
    height = typeof window !== "undefined" ? window.innerHeight : 0,
  } = useWindowSize();
  const [site, setSite] = useState(null);
  const [timezoneData, setTimezoneData] = useState<TimezoneData>(null);
  const [historicData, setHistoricData] = useState(null);
  const [floodData, setFloodData] = useState(null);

  console.log({
    site,
    timezoneData,
    historicData,
    floodData,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("resize"));
    }
  }, []);

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

  useEffect(() => {
    if (site && timezoneData && historicData && !floodData) {
      // declare the data fetching function
      const fetchData = async () => {
        // Fetch data from Timezone API
        setFloodData(
          // @ts-ignore
          await FetchFlood(site)
        );
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [historicData]);

  const clear = () => {
    setSite([]);
    setTimezoneData(null);
    setHistoricData(null);
    setFloodData(null);
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
        <Container
          maxWidth="xl"
          style={{ paddingTop: "6em", overflow: "none" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Box sx={{ height: { xs: 250, md: height - 105 } }}>
                <Map site={site} setSite={setSite} clear={clear} />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                className="scroll"
                sx={{
                  height: { xs: height - 355, md: height - 105 },
                  pr: "0.5em !important",
                }}
              >
                {!site && (
                  <Block>
                    <Typography variant="subtitle1" gutterBottom>
                      Click on an area of the map to view it's weather history.
                    </Typography>
                  </Block>
                )}
                {timezoneData && (
                  <LocationInfo site={site} info={timezoneData} />
                )}
                {historicData && (
                  <>
                    <MeanTemp data={historicData.temperature} />
                    <Precipitation data={historicData.precipitation} />
                  </>
                )}
                {floodData && (
                  <FloodDischarge data={floodData.discharge} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
