import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  // Function to handle the API response
  function handleResponse(response) {
  const data = response.data;
  console.log("API Response:", data); 
  setWeatherData({
    ready: true,
    coordinates: data.coordinates,  
    temperature: data.temperature.current,
    humidity: data.temperature.humidity,
    date: new Date(data.time * 1000),
    description: data.condition.description,
    icon: data.condition.icon,
    wind: data.wind.speed,
    city: data.city,
  });
}


  // Function to handle form submit
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  // Function to handle city change input
  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // Function to fetch weather data from the SheCodes API
  function search() {
    const apiKey = "ft01o336fa01b0d041f3cbcd1c5dc250";  // Your SheCodes API key
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`; // SheCodes API URL
    
    // Make the Axios GET request
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

 if (weatherData.ready) {
  return (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city.."
              className="form-control"
              autoFocus="on"
              onChange={handleCityChange}
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>
      <WeatherInfo data={weatherData} />
      {weatherData.coordinates && <WeatherForecast coordinates={weatherData.coordinates} />}
    </div>
  );
} else {
  search();  // Call the search function to load data when the component first loads
  return "Loading...";
}

}
