import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <form>
          <input
            id="search-input"
            type="search"
            placeholder="Enter a city..."
          ></input>
          <input id="submit-input" type="submit" value="Search"></input>
        </form>
        <hr id="hr-line"></hr>
        <div className="weather-box">
          <div className="weather-summary">
            <h1>City</h1>
            <p>
              Day Ti:me, description
              <br />
              Humidity: <span className="weather-info">..%</span>, Wind:{" "}
              <span className="weather-info">..km/h</span>
            </p>
          </div>
          <div classname="weather-temp">
            <span className="temp-number">☁️10</span>
            <span className="degrees-celcius">°C</span>
          </div>
        </div>
        <hr id="last-hr"></hr>
        <footer>
          <p>
            This project was coded by {""}
            <a
              href="https://www.shecodes.io/graduates/122713-jinoveva-lopes"
              target="_blank"
            >
              Jinoveva Lopes
            </a>{" "}
            and is open-sourced on {""}
            <a
              href="https://github.com/Jinoveva/react-weather-app"
              target="_blank"
            >
              Github
            </a>{" "}
            {""}
            and hosted on {""}
            <a
              href="https://jinovevas-react-weather-app.netlify.app/"
              target="_blank"
            >
              Netlify
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
