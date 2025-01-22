import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay({ data }) {
  const maxTemperature = `${Math.round(data.temp.max)}°`;
  const minTemperature = `${Math.round(data.temp.min)}°`;
  const day = new Date(data.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div>
      <div className="WeatherForecast-day">{day}</div>
      <WeatherIcon code={data.weather[0].icon} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">{maxTemperature}</span>
        <span className="WeatherForecast-temperature-min">{minTemperature}</span>
      </div>
    </div>
  );
}
