import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function Landing() {
  const navigate = useNavigate();
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to Flight Booking App
      </Typography>
      <Button variant="outlined" color="primary" onClick={() => navigate("/flight-search")}>
        Search Flights Here
      </Button>
    </Box>
  );
}

export default Landing;