import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function App() {
  const [weatherData, setWeatherdata] = useState({ ready: false });

  function handleResponse(response) {
    console.log(response.data);
    setWeatherdata({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
    });
  }

  if (weatherData.ready) {
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
              <h1>{weatherData.city}</h1>
              <p>
                Day Ti:me,{" "}
                <span className="text-capitalize">
                  {weatherData.description}
                </span>
                <br />
                Humidity:{" "}
                <span className="weather-info">{weatherData.humidity}%</span>
                Wind:{" "}
                <span className="weather-info">{weatherData.wind}km/h</span>
              </p>
            </div>
            <div classname="weather-temp">
              <span className="temp-number">☁️{weatherData.temperature}</span>
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
    const apiKey = "f3887e262c88d1158f7e2ef4998e234c";
    const city = "Johannesburg";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
