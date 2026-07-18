import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const rowsPerPage = 5;

  const isFormValid = source && destination && date && source !== destination;

  const handleSearch = () => {
    if (!isFormValid) return;
    dispatch(
      setSearchParams({ sourceCity: source, destinationCity: destination, journeyDate: date })
    );

    const results = flightsData.filter(
      (f) => f.source === source && f.destination === destination
    );
    dispatch(setSearchResults(results.length ? results : flightsData));
    setPage(0);
  };

  const handleBook = (flight) => {
    dispatch(selectFlight(flight));
    navigate("/flight-booking");
  };

  const totalPages = Math.ceil(searchResults.length / rowsPerPage);
  const paginatedResults = searchResults.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flight-search-page">
      <div className="trip-type">
        <label>
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={(e) => dispatch(setTripType(e.target.value))}
          />
          One Way
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={(e) => dispatch(setTripType(e.target.value))}
          />
          Round Trip
        </label>
      </div>

      <div className="form-field">
        <label>Source City</label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Select</option>
          {cityList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Destination City</label>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Select</option>
          {cityList.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Journey Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <button disabled={!isFormValid} onClick={handleSearch}>
        Search Flight
      </button>

      {searchResults.length > 0 && (
        <div className="results-table">
          {paginatedResults.map((flight) => (
            <div className="flight-row" key={flight.id}>
              <span className="airline-initial">{flight.airline[0]}</span>
              <span>
                {flight.departureTime}
                <br />
                {flight.source}
              </span>
              <span>
                {flight.airline}
                <br />
                {flight.flightNumber}
              </span>
              <span>
                {flight.arrivalTime}
                <br />
                {flight.destination}
                <br />
                {flight.stops}
              </span>
              <button className="book-flight" onClick={() => handleBook(flight)}>
                Rs. {flight.price.toLocaleString()}
              </button>
            </div>
          ))}

          <div className="pagination">
            <span>
              Rows per page: {rowsPerPage}   {page * rowsPerPage + 1}-
              {Math.min((page + 1) * rowsPerPage, searchResults.length)} of {searchResults.length}
            </span>
            <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              {"<"}
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightSearch;