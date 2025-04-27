import React from "react";
import FormattedDate from "./FormattedDate";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <hr id="hr-line" />
      <div className="weather-box">
        <div className="weather-summary">
          <h1>{props.data.city}</h1>
          <p>
            <FormattedDate date={props.data.date} />
            <span className="text-capitalize">{props.data.description}</span>
            <br />
            Humidity:{" "}
            <span className="weather-info">{props.data.humidity}%</span>
            Wind: <span className="weather-info">{props.data.wind} km/h</span>
          </p>
        </div>
        <div className="weather-temp">
          <span className="temp-number">🌡{props.data.temperature}</span>
          <span className="degrees-celcius">°C</span>
        </div>
      </div>
      <hr id="last-hr" />
    </div>
  );
}
