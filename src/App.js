import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function App() {
  return (
    <div className="App">
      <form>
        <input type="search" placeholder="Enter a city..."></input>
        <input type="submit" value="Search"></input>
      </form>
      <hr></hr>
      <div>
        <h1>City</h1>
        <p>
          Day Ti:me, description
          <br />
          Humidity: ..%, Wind: ..km/h
        </p>
      </div>
      <div>☁️10°C</div>
    </div>
  );
}
