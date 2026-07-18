import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./../styles/App.css";
import Landing from "./Landing";
import FlightSearch from "./FlightSearch";
import FlightBooking from "./FlightBooking";
import Confirmation from "./Confirmation";

const App = () => {
  return (
    <div>
      {/* Do not remove the main div */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Flight Booking App</Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
};

export default App;