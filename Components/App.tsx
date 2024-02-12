import React, { useEffect, useState } from "react";

// NexJS
import Head from "next/head";

// MUI
import { Typography, Box, Grid, CircularProgress } from "@mui/material";

// Libraries
import {
  FetchTimezone,
  FetchHistoricWeather,
  FetchFlood,
  fetchForecast,
  // FetchClimate,
} from "../Components/FetchAPI";
import { useWindowSize } from "usehooks-ts";

// MUI Theme
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import Block from "../Components/Block";
import SiteHeader from "./SiteHeader";
import LocationInfo from "../Components/LocationInfo";
import Map from "./Map";
import MeanTemp from "./Graphs/MeanTemp";
import Precipitation from "./Graphs/Precipitation";
import FloodDischarge from "./Graphs/FloodDischarge";
import Forecast from "./Graphs/Forecast";
import ForecastTemp from "./Graphs/ForecastTemp";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#275f9f" },
  },
  typography: {
    fontSize: 12.6,
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
  // const [climateChangeData, setClimateChangedata] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // console.log({
  //   site,
  //   timezoneData,
  //   historicData,
  //   floodData,
  //   // climateChangeData,
  //   forecastData,
  // });

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
    if (site && timezoneData && !forecastData) {
      // declare the data fetching function
      const fetchData = async () => {
        // Fetch data from Timezone API
        setForecastData(
          // @ts-ignore
          await fetchForecast(site, timezoneData.zoneName)
        );
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [timezoneData]);

  useEffect(() => {
    if (site && timezoneData && forecastData && !historicData) {
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
  }, [forecastData]);

  useEffect(() => {
    if (site && timezoneData && forecastData && historicData && !floodData) {
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

  // useEffect(() => {
  //   if (
  //     site &&
  //     timezoneData &&
  //     forecastData &&
  //     historicData &&
  //     floodData &&
  //     !climateChangeData
  //   ) {
  //     // declare the data fetching function
  //     const fetchData = async () => {
  //       // Fetch data from Timezone API
  //       setFloodData(
  //         // @ts-ignore
  //         await FetchClimate(site)
  //       );
  //     };

  //     // call the function
  //     fetchData()
  //       // make sure to catch any error
  //       .catch(console.error);
  //   }
  // }, [floodData]);

  const clear = () => {
    setSite([]);
    setTimezoneData(null);
    setHistoricData(null);
    setFloodData(null);
    // setClimateChangedata(null);
    setForecastData(null);
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
        <Box style={{ paddingTop: "1em", overflow: "none", width: "100%" }}>
          <Grid
            container
            spacing={2}
            style={{
              margin: "-16px 0 0 -10px",
              width: "100%",
            }}
          >
            <Grid item xs={12} md={5}>
              <Box
                sx={{ height: { xs: 250, md: height - 95 }, p: "0 0 0 5px" }}
              >
                <Map site={site} setSite={setSite} clear={clear} />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                className="scroll"
                sx={{
                  height: { xs: height - 355, md: height - 95 },
                  pr: "0.5em !important",
                }}
              >
                {!site && (
                  <Block>
                    <div style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Click on an area of the map to view it's weather
                        forecast and history.
                      </Typography>
                    </div>
                  </Block>
                )}

                {site &&
                  (!timezoneData ||
                    !forecastData ||
                    !historicData ||
                    !floodData) && (
                    <Block
                      style={{
                        position: "relative",
                        zIndex: 0,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        <CircularProgress
                          size="1rem"
                          color="inherit"
                          style={{ marginRight: "8px" }}
                        />
                        <b>Fetching Weather API...</b>
                      </Typography>
                    </Block>
                  )}

                {site &&
                  timezoneData &&
                  forecastData &&
                  historicData &&
                  floodData && <LocationInfo site={site} info={timezoneData} />}
                {site &&
                  timezoneData &&
                  forecastData &&
                  historicData &&
                  floodData && (
                    <>
                      <Forecast data={forecastData.weatherCode} />
                      <ForecastTemp data={forecastData.forecast} />
                    </>
                  )}
                {site &&
                  timezoneData &&
                  forecastData &&
                  historicData &&
                  floodData && (
                    <>
                      <MeanTemp data={historicData.temperature} />
                      <Precipitation data={historicData.precipitation} />
                    </>
                  )}
                {site &&
                  timezoneData &&
                  forecastData &&
                  historicData &&
                  floodData && <FloodDischarge data={floodData.discharge} />}
                <Block>
                  <div style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      This application uses APIs from{" "}
                      <a href="https://timezonedb.com/">Timezonedb</a> and{" "}
                      <a href="https://open-meteo.com/">Open-Meteo</a>.
                    </Typography>
                  </div>
                </Block>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
