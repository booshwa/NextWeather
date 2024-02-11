import React from "react";

// MUI
import {
  Typography,
  Chip,
  Box,
  Grid,
  Divider,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import RenderValue from "./RenderValue";
import Block from "./Block";

const LocationInfo = ({ site, info }) => {
  return (
    // <Accordion>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="location-info-content"
    //     id="location-info-header"
    //   >
    //     <Typography variant="subtitle1" gutterBottom>
    //       <b>Location Info</b>
    //     </Typography>
    //   </AccordionSummary>

    //   <AccordionDetails>
    <Block>
      <Typography variant="subtitle1" gutterBottom>
        <b>Location Info</b>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TableContainer style={{ width: "100%" }}>
            <Table size="small">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" style={{ width: "25%" }}>
                    <b>City:</b>
                  </TableCell>
                  <TableCell align="left" style={{ width: "75%" }}>
                    <RenderValue value={info.cityName} />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" style={{ width: "25%" }}>
                    <b>Region:</b>
                  </TableCell>
                  <TableCell align="left" style={{ width: "75%" }}>
                    <RenderValue value={info.regionName} />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" style={{ width: "25%" }}>
                    <b>Country:</b>
                  </TableCell>
                  <TableCell align="left" style={{ width: "75%" }}>
                    <RenderValue value={info.countryName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer style={{ width: "100%" }}>
            <Table size="small">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" style={{ width: "25%" }}>
                    <b>Coordinates:</b>
                  </TableCell>
                  <TableCell align="left" style={{ width: "75%" }}>
                    <RenderValue
                      value={`${site.latitude.toFixed(
                        6
                      )}, ${site.longitude.toFixed(6)}`}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" style={{ width: "25%" }}>
                    <b>Time Zone:</b>
                  </TableCell>
                  <TableCell align="left" style={{ width: "75%" }}>
                    <RenderValue value={info.zoneName} />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" style={{ width: "25%" }}>
                    <b>Abbreviation:</b>
                  </TableCell>
                  <TableCell align="left" style={{ width: "75%" }}>
                    <RenderValue value={info.abbreviation} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Block>

    //   </AccordionDetails>
    // </Accordion>
  );
};

export default LocationInfo;
