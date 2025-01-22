import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast({ coordinates }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!coordinates) return;

    const apiKey = "ft01o336fa01b0d041f3cbcd1c5dc250"; 
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=metric`; // Updated API URL

    // Fetch forecast data
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data);  // Log the response to check the data
        setForecast(response.data.daily); // Assuming the 'daily' data is returned
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, [coordinates]); // Re-fetch when coordinates change

  if (!forecast) {
    return <div>Loading forecast...</div>; // Show loading message while fetching forecast
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(0, 5).map((dailyForecast, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay data={dailyForecast} />
          </div>
        ))}
      </div>
    </div>
  );
}
