import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather({ defaultCity }) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(defaultCity);

  useEffect(() => {
    searchCity(city); // Fetch weather data for the default city on mount
  }, [city]);

  function handleResponse(response) {
    const { coord, main, weather, wind, name, dt } = response.data;
    setWeatherData({
      coordinates: coord,
      temperature: main.temp,
      humidity: main.humidity,
      date: new Date(dt * 1000),
      description: weather[0].description,
      icon: weather[0].icon,
      wind: wind.speed,
      city: name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity(city);
  }

  function searchCity(cityName) {
    const apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (!weatherData) {
    return "Loading...";
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city.."
              className="form-control"
              autoFocus
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-3">
            <input type="submit" value="Search" className="btn btn-primary w-100" />
          </div>
        </div>
      </form>
      <WeatherInfo data={weatherData} />
      <WeatherForecast coordinates={weatherData.coordinates} />
    </div>
  );
}
