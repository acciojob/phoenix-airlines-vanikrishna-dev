import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to Phoenix Airlines</h1>
      <p>Book your flights quickly and easily.</p>
      <button onClick={() => navigate("/flight-search")}>Book a Flight</button>
    </div>
  );
}

export default Landing;