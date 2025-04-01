import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf6b50b908fa2e0baca3eed8a569a5f6&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setTemperature(response.data.main.temp);
        setDescription(response.data.weather[0].description);
        setHumidity(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(mapWeatherIcon(response.data.weather[0].icon));
        setMessage(`Weather in ${city}:`);
      })
      .catch(() => {
        setMessage("City not found. Please try again.");
        setTemperature(null);
        setDescription("");
        setHumidity(null);
        setWind(null);
        setIcon("");
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  // Function to map OpenWeatherMap icons to ReactAnimatedWeather icons
  function mapWeatherIcon(openWeatherIcon) {
    const iconMapping = {
      "01d": "CLEAR_DAY",
      "01n": "CLEAR_NIGHT",
      "02d": "PARTLY_CLOUDY_DAY",
      "02n": "PARTLY_CLOUDY_NIGHT",
      "03d": "CLOUDY",
      "03n": "CLOUDY",
      "04d": "CLOUDY",
      "04n": "CLOUDY",
      "09d": "RAIN",
      "09n": "RAIN",
      "10d": "RAIN",
      "10n": "RAIN",
      "11d": "SLEET",
      "11n": "SLEET",
      "13d": "SNOW",
      "13n": "SNOW",
      "50d": "FOG",
      "50n": "FOG",
    };
    return iconMapping[openWeatherIcon] || "CLEAR_DAY";
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city..."
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>

      <h2>{message}</h2>
      {temperature !== null && (
        <ul>
          <li>
            <strong>Temperature:</strong> {Math.round(temperature)}°C
          </li>
          <li>
            <strong>Description:</strong> {description}
          </li>
          <li>
            <strong>Humidity:</strong> {humidity}%
          </li>
          <li>
            <strong>Wind:</strong> {Math.round(wind)} km/h
          </li>
          <li>
            <ReactAnimatedWeather
              icon={icon}
              color="goldenrod"
              size={50}
              animate={true}
            />
          </li>
        </ul>
      )}
    </div>
  );
}
