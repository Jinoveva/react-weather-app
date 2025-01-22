import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay({ data }) {
  // Ensure that data exists and has the necessary fields before attempting to use them
  const maxTemperature = data && data.temp ? `${Math.round(data.temp.max)}°` : "N/A";
  const minTemperature = data && data.temp ? `${Math.round(data.temp.min)}°` : "N/A";
  const day = data && data.dt
    ? new Date(data.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
    : "N/A";

  return (
    <div>
      <div className="WeatherForecast-day">{day}</div>
      <WeatherIcon code={data && data.weather ? data.weather[0].icon : ""} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">{maxTemperature}</span>
        <span className="WeatherForecast-temperature-min">{minTemperature}</span>
      </div>
    </div>
  );
}

