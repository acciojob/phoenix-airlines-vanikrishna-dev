import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { resetBooking } from "../redux/bookingSlice";

function Confirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingConfirmed } = useSelector((state) => state.booking);

  if (!bookingConfirmed) {
    navigate("/flight-search");
    return null;
  }

  const handleHome = () => {
    dispatch(resetBooking());
    navigate("/");
  };

  return (
    <Box p={3}>
      <Typography gutterBottom>
        Thank you for the Booking. Click the below button to return to home page
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleHome}>
        Back to Home
      </Button>
    </Box>
  );
}

export default Confirmation;