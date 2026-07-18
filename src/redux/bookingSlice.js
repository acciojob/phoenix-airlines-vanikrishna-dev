import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripType: "oneway",
  sourceCity: "",
  destinationCity: "",
  journeyDate: "",
  searchResults: [],
  selectedFlight: null,
  passenger: {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  },
  bookingConfirmed: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTripType(state, action) {
      state.tripType = action.payload;
    },
    setSearchParams(state, action) {
      const { sourceCity, destinationCity, journeyDate } = action.payload;
      state.sourceCity = sourceCity;
      state.destinationCity = destinationCity;
      state.journeyDate = journeyDate;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    selectFlight(state, action) {
      state.selectedFlight = action.payload;
    },
    setPassengerField(state, action) {
      const { field, value } = action.payload;
      state.passenger[field] = value;
    },
    confirmBooking(state) {
      state.bookingConfirmed = true;
    },
    resetBooking() {
      return initialState;
    },
  },
});

export const {
  setTripType,
  setSearchParams,
  setSearchResults,
  selectFlight,
  setPassengerField,
  confirmBooking,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;