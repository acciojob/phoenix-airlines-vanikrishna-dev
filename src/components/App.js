import React from "react";
import { Routes, Route } from "react-router-dom";
import "./../styles/App.css";
import Landing from "./Landing";
import FlightSearch from "./FlightSearch";
import FlightBooking from "./FlightBooking";
import Confirmation from "./Confirmation";

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/flight-search" element={<FlightSearch />} />
          <Route path="/flight-booking" element={<FlightBooking />} />
          <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  )
}

export default App
