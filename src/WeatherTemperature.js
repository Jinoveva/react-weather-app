import React, { useState } from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  // If the unit is Celsius
  if (unit === "celsius") {
    return (
      <div className="weather-temp">
        <span className="temp-number">
          <WeatherIcon code={props.data.icon} size={52} />{" "}
          {/* Fixed prop passing */}
          {props.data.temperature}
        </span>
        <span className="degrees-celsius">
          °C |{" "}
          <a href="/" onClick={showFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    // If the unit is Fahrenheit
    let fahrenheit = (props.data.temperature * 9) / 5 + 32;
    return (
      <div className="weather-temp">
        <span className="temp-number">
          <WeatherIcon code={props.data.icon} size={52} />{" "}
          {/* Fixed prop passing */}
          {Math.round(fahrenheit)} {/* Rounding for a cleaner display */}
        </span>
        <span className="degrees-celsius">
          °F |{" "}
          <a href="/" onClick={showCelsius}>
            °C
          </a>
        </span>
      </div>
    );
  }
}
