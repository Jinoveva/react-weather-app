import "./Weather.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [weatherData, setWeatherdata] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity); // ✅ FIXED: Ensure defaultCity is passed in index.js


  function handleResponse(response) {
    console.log(response.data);
    setWeatherdata({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
      date: new Date(), // @Jinoveva ✅ ADDED: Needed for FormattedDate
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "f3887e262c88d1158f7e2ef4998e234c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  // ✅ FIXED: @Jinoveva Prevent infinite loop by using useEffect instead of calling search() directly in render
  useEffect(() => {
    search();
  }, []);

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              id="search-input"
              type="search"
              placeholder="Enter a city..."
              onChange={handleCityChange}
            ></input>
            <input id="submit-input" type="submit" value="Search"></input>
          </form>
          <WeatherInfo data={weatherData} />
          <footer>
            <p>
              This project was coded by {""}
              <a
                href="https://www.shecodes.io/graduates/122713-jinoveva-lopes"
                target="_blank"
                rel="noreferrer"
              >
                Jinoveva Lopes
              </a>{" "}
              and is open-sourced on {""}
              <a
                href="https://github.com/Jinoveva/react-weather-app"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>{" "}
              {""}
              and hosted on {""}
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
  } else {
    search();
    return "Loading...";
  }
}
