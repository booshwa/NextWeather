import React from "react";

// MUI
import {
  Typography,
  Toolbar,
  Box,
  AppBar,
  IconButton,
} from "@mui/material";

// MUI Icon
import GitHubIcon from "@mui/icons-material/GitHub";

function SiteHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b>Next Weather</b>
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="https://github.com/booshwa/NextWeather"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default SiteHeader;
