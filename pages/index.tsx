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
import { FetchTimezone } from "../Components/FetchAPI";

// MUI Theme
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#275f9f" },
  },
  // typography: {
  //   fontSize: 12.6, // 14px - 10% = 12.6px
  // },
});

// Components
const Map = dynamic(() => import("../Components/Map"), {
  ssr: false,
});

import SiteHeader from "../Components/Header";
import LocationInfo from "../Components/LocationInfo";

export default function Home() {
  const [sites, setSites] = useState([]);
  const [timezoneData, setTimezoneData] = useState(null);
  const [historicData, setHistoricData] = useState(null);

  console.log({ sites, timezoneData, historicData });

  useEffect(() => {
    if (sites.length > 0) {
      // declare the data fetching function
      const fetchData = async () => {
        setTimezoneData(await FetchTimezone(sites));
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [sites]);

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
          <Map sites={sites} setSites={setSites} />
          <Divider />

          {timezoneData && <LocationInfo info={timezoneData} />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
