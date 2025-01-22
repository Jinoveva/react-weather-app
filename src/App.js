import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="New York" />

        <footer>
          This project was coded by{" "}
          <a href="https://www.shecodes.io/graduates/122713-jinoveva-lopes" target="_blank">
          Jinoveva Lopes
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/Jinoveva/react-weather-app"
            target="_blank"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href=""
            target="_blank"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}