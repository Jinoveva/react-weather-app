import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <hr id="hr-line" />
      <div className="weather-box">
        <div className="weather-summary">
          <h1>{props.data.city}</h1>
          <p>
            <FormattedDate />
            <span className="text-capitalize">{props.data.description}</span>
            <br />
            Humidity:{" "}
            <span className="weather-info">{props.data.humidity}%</span>
            Wind: <span className="weather-info">{props.data.wind} km/h</span>
          </p>
        </div>
        <WeatherTemperature data={props.data} /> {/* Pass complete data */}
      </div>
      <hr id="last-hr" />
    </div>
  );
}
