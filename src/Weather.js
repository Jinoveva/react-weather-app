import "./Weather.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";

import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [errorMessage, setErrorMessage] = useState("");

  function handleResponse(response) {
    console.log("API Response:", response.data);
    if (response.data.city) {
      setWeatherData({
        ready: true,
        coordinates: response.data.coordinates,
        temperature: Math.round(response.data.temperature.current),
        description: response.data.condition.description,
        date: new Date(response.data.time * 1000),
        humidity: Math.round(response.data.temperature.humidity),
        wind: Math.round(response.data.wind.speed),
        icon: response.data.condition.icon,
        city: response.data.city,
      });
      setErrorMessage("");
    } else {
      setWeatherData({ ready: false });
      setErrorMessage("City not found!");
    }
  }

  function handleError(error) {
    console.log("API Error:", error);
    setWeatherData({ ready: false });

    if (error.response && error.response.status === 429) {
      setErrorMessage("Too many requests — please try again later.");
    } else {
      setErrorMessage("Failed to fetch weather data!");
    }
  }

  const search = useCallback(() => {
    const apiKey = "ft01o336fa01b0d041f3cbcd1c5dc250";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    console.log("API URL:", apiUrl);
    axios.get(apiUrl).then(handleResponse).catch(handleError);
  }, [city]);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // Commented out to avoid hitting the API on every page load
  // useEffect(() => {
  //   search();
  // }, [search]);

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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {weatherData.ready && (
          <>
            <WeatherInfo data={weatherData} />
            <WeatherForecast coordinates={weatherData.coordinates} />
          </>
        )}

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
              GitHub
            </a>{" "}
            and hosted on{" "}
            <a
              href="https://jinos-react-weather-app.netlify.app/"
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
