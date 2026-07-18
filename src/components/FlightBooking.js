import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { setPassengerField, confirmBooking } from "../redux/bookingSlice";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

function FlightBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedFlight, passenger } = useSelector((state) => state.booking);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!selectedFlight) {
    navigate("/flight-search");
    return null;
  }

  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : "This field is required";
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Enter a valid email";
      case "mobile":
        return MOBILE_REGEX.test(value) ? "" : "Enter a valid 10-digit mobile number";
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    dispatch(setPassengerField({ field, value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, passenger[field]) }));
  };

  const handleConfirm = () => {
    const allErrors = {};
    ["firstName", "lastName", "email", "mobile"].forEach((field) => {
      allErrors[field] = validateField(field, passenger[field]);
    });
    setErrors(allErrors);
    setTouched({ firstName: true, lastName: true, email: true, mobile: true });
    const valid = Object.values(allErrors).every((e) => e === "");
    if (!valid) return;
    dispatch(confirmBooking());
    navigate("/confirmation");
  };

  return (
    <Box p={3} maxWidth={480}>
      <Typography variant="h5" gutterBottom>
        Booking Confirmation for Flight {selectedFlight.airline} ({selectedFlight.flightNumber})
      </Typography>

      <TextField
        label="First Name"
        type="text"
        required
        fullWidth
        margin="normal"
        value={passenger.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        onBlur={() => handleBlur("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />

      <TextField
        label="Last Name"
        type="text"
        required
        fullWidth
        margin="normal"
        value={passenger.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        onBlur={() => handleBlur("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />

      <TextField
        label="Email ID"
        type="text"
        required
        fullWidth
        margin="normal"
        value={passenger.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Mobile Number"
        type="text"
        required
        fullWidth
        margin="normal"
        value={passenger.mobile}
        onChange={(e) => handleChange("mobile", e.target.value)}
        onBlur={() => handleBlur("mobile")}
        error={!!errors.mobile}
        helperText={errors.mobile}
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
}

export default FlightBooking;