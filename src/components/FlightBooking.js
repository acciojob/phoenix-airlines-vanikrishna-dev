import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <div className="flight-booking-page">
      <h2>
        Booking Confirmation for Flight {selectedFlight.airline} ({selectedFlight.flightNumber})
      </h2>

      <div className="form-field">
        <label>First Name*</label>
        <input
          type="text"
          value={passenger.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          onBlur={() => handleBlur("firstName")}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-field">
        <label>Last Name*</label>
        <input
          type="text"
          value={passenger.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          onBlur={() => handleBlur("lastName")}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-field">
        <label>Email ID*</label>
        <input
          type="text"
          value={passenger.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label>Mobile Number*</label>
        <input
          type="text"
          value={passenger.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          onBlur={() => handleBlur("mobile")}
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}
      </div>

      <button onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
}

export default FlightBooking;