import React from "react";
import {
  Container,
  Avatar,
  Typography,
  Button,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

function SiteHeader() {
  return (
    <AppBar component="nav">
      <Container
        maxWidth="lg"
        sx={{
          paddingLeft: { xs: "0px", sm: "16px" },
          paddingRight: { xs: "0px", sm: "16px" },
        }}
      >
        <Toolbar
          sx={{
            paddingLeft: { xs: "0px", md: "16px" },
            paddingRight: { xs: "0px", md: "16px" },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              ml: "0.5em",
              fontWeight: "bold",
              flexGrow: 1,
              display: { xs: "none", md: "block" },
            }}
          >
            Next Weather
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              ml: "0.5em",
              fontWeight: "bold",
              flexGrow: 1,
              display: { xs: "none", sm: "block", md: "none" },
            }}
          >
            {" "}
          </Typography>
          {/* </Box> */}
          {/* <Box sx={{ margin: { xs: "0 auto", md: "inherit" } }}>
            <Button
              sx={{
                color: "#fff",
                fontSize: { xs: "0.6875rem", md: "0.7875rem" },
              }}
            >
              About Me
            </Button>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default SiteHeader;
