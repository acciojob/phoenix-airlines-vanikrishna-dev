import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { cityList } from "../data/flights";
import flightsData from "../data/flights";
import {
  setTripType,
  setSearchParams,
  setSearchResults,
  selectFlight,
} from "../redux/bookingSlice";

function FlightSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripType, searchResults } = useSelector((state) => state.booking);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState(false);

  const isFormValid = source && destination && date && source !== destination;

  const handleSearch = () => {
    if (!isFormValid) return;
    dispatch(setSearchParams({ sourceCity: source, destinationCity: destination, journeyDate: date }));
    const results = flightsData.filter((f) => f.source === source && f.destination === destination);
    dispatch(setSearchResults(results));
    setSearched(true);
    setPage(0);
  };

  const handleBook = (flight) => {
    dispatch(selectFlight(flight));
    navigate("/flight-booking");
  };

  const paginated = searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={3} maxWidth={480}>
      <RadioGroup row value={tripType} onChange={(e) => dispatch(setTripType(e.target.value))}>
        <FormControlLabel value="oneway" control={<Radio color="primary" />} label="One Way" />
        <FormControlLabel value="roundtrip" control={<Radio color="primary" />} label="Round Trip" />
      </RadioGroup>

      <Autocomplete
        options={cityList}
        value={source || null}
        onChange={(e, newValue) => setSource(newValue || "")}
        renderInput={(params) => (
          <TextField {...params} label="Source City" variant="outlined" fullWidth margin="normal" />
        )}
      />

      <Autocomplete
        options={cityList}
        value={destination || null}
        onChange={(e, newValue) => setDestination(newValue || "")}
        renderInput={(params) => (
          <TextField {...params} label="Destination City" variant="outlined" fullWidth margin="normal" />
        )}
      />

      <TextField
        label="Journey Date"
        type="text"
        placeholder="dd/mm/yyyy"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth disabled={!isFormValid} onClick={handleSearch}>
          Search Flight
        </Button>
      </Box>

      {searched && searchResults.length === 0 && (
        <Box mt={4}>
          <Typography>No flights available</Typography>
        </Box>
      )}

      {searchResults.length > 0 && (
        <Box mt={4}>
          {paginated.map((flight) => (
            <Paper
              key={flight.id}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, marginBottom: 12 }}
            >
              <Avatar>{flight.airline[0]}</Avatar>
              <Box textAlign="center">
                <div>{flight.departureTime}</div>
                <div>{flight.source}</div>
              </Box>
              <Box textAlign="center">
                <div>{flight.airline}</div>
                <div>{flight.flightNumber}</div>
              </Box>
              <Box textAlign="center">
                <div>{flight.arrivalTime}</div>
                <div>{flight.destination}</div>
                <div>{flight.stops}</div>
              </Box>
              <Button className="book-flight" variant="contained" color="primary" onClick={() => handleBook(flight)}>
                Rs. {flight.price.toLocaleString()}
              </Button>
            </Paper>
          ))}
          <TablePagination
            component="div"
            count={searchResults.length}
            page={page}
            onChangePage={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      )}
    </Box>
  );
}

export default FlightSearch;