import "./Weather.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state

  function handleResponse(response) {
    console.log("API Response:", response.data); // Debug API response
    if (response.data.cod === 200) {
      setWeatherData({
        ready: true,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        date: new Date(response.data.dt * 1000), // OpenWeatherMap gives `dt` as a UNIX timestamp
        humidity: Math.round(response.data.main.humidity),
        wind: Math.round(response.data.wind.speed),
        icon: response.data.weather[0].icon,
        city: response.data.name,
      });
      setErrorMessage(""); // Clear error message if data is successfully fetched
    } else {
      setWeatherData({ ready: false });
      setErrorMessage("City not found!"); // Set error message if city is invalid
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "f3887e262c88d1158f7e2ef4998e234c"; // Hardcoded API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Debugging: Check if the API URL is correct
    console.log("API URL:", apiUrl);

    axios.get(apiUrl).then(handleResponse).catch(handleError);
  }

  function handleError(error) {
    console.log("API Error:", error); // Log the error to the console for debugging
    setWeatherData({ ready: false });
    setErrorMessage("Failed to fetch weather data!");
  }

  useEffect(() => {
    search(); // Call search on component mount
  }, []);

  // Return should be inside the functional component's body
  if (!weatherData.ready) {
    return (
      <div className="Weather">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              id="search-input"
              type="search"
              placeholder="Enter a city..."
              onChange={handleCityChange}
            />
            <input id="submit-input" type="submit" value="Search" />
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
          {/* Display error message */}
        </div>
      </div>
    );
  }

  // Return the main weather data UI
  return (
    <div className="Weather">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="search"
            placeholder="Enter a city..."
            onChange={handleCityChange}
          />
          <input id="submit-input" type="submit" value="Search" />
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast />
        <footer>
          <p>
            This project was coded by{" "}
            <a
              href="https://www.shecodes.io/graduates/122713-jinoveva-lopes"
              target="_blank"
              rel="noreferrer"
            >
              Jinoveva Lopes
            </a>{" "}
            and is open-sourced on{" "}
            <a
              href="https://github.com/Jinoveva/react-weather-app"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>{" "}
            and hosted on{" "}
            <a
              href="https://jinovevas-react-weather-app.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Netlify
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
