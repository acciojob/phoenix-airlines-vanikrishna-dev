import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetBooking } from "../redux/bookingSlice";

function Confirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedFlight, passenger, bookingConfirmed } = useSelector(
    (state) => state.booking
  );

  if (!bookingConfirmed || !selectedFlight) {
    navigate("/flight-search");
    return null;
  }

  const handleHome = () => {
    dispatch(resetBooking());
    navigate("/");
  };

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmed!</h2>
      <p>
        Thank you, {passenger.firstName} {passenger.lastName}
      </p>
      <p>
        Flight {selectedFlight.airline} ({selectedFlight.flightNumber}) — {selectedFlight.source}{" "}
        to {selectedFlight.destination}
      </p>
      <p>Confirmation sent to {passenger.email}</p>
      <button onClick={handleHome}>Back to Home</button>
    </div>
  );
}

export default Confirmation;