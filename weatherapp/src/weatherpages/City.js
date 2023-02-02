import React from "react";
import { useState } from "react";
import axios from "axios";
import images from "../images/images";
const City = () => {
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error404, setError404] = useState(false);
  //   const isDay = weather.icon?.includes("d");
  //   const getTime = (timeStamp) => {
  //     return `${new Date(timeStamp * 1000).getHours()}  : ${new Date(
  //       timeStamp * 1000
  //     ).getMinutes()}`;
  //};
  // const currentTime = new Date();
  // const isDaytime =
  //   currentTime > new Date(weather.sys.sunrise * 1000) &&
  //   currentTime < new Date(weather.sys.sunset * 1000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1c8750d17477c8f091f7a28691e88c26`
      );
      setWeather(response.data);
      setLoading(false);
      setCity("");
    } catch (error) {
      if (error.response.data.cod === "404") {
        setLoading(false);
        setError404(true);
      }
      setError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading... please wait</p>;
  }

  if (error404) {
    return <p>There is no city with this name please try again.</p>;
  }

  return (
    <div className="main_container">
      <h1>React Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="placeholder_btn"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>

      {weather.name && (
        <div>
          <h2>The Weather in {weather.name}</h2>
<div className="Flexbox">
          <div className="container">
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <img
              className="image"
              src={
                "https://www.pngall.com/wp-content/uploads/2017/01/Temperature-PNG-Clipart.png"
              }
            />
          </div>

          <div className="container">
            <p>Humidity: {weather.main.humidity}</p>
            <img
              className="image"
              src={"https://cdn-icons-png.flaticon.com/512/2903/2903592.png"}
            />
          </div>

          <div className="container">
            <p>Pressure: {weather.main.pressure}</p>{" "}
            <img
              className="image"
              src={"https://cdn-icons-png.flaticon.com/512/4115/4115991.png"}
            />
          </div>

          <div className="container">
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <img
              className="image"
              src={
                " https://www.pngall.com/wp-content/uploads/5/Wind-PNG-Free-Image.png"
              }
            />
          </div>

          
            {/* <p>
              {isDay ? "Sunset" : "Sunrise"}{" "}
              {`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
            </p> */}

            <div className="container">
              <p>
                Sunrise:
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
              <img
                className="image"
                src={"https://cdn-icons-png.flaticon.com/512/1163/1163765.png "}
              />
            </div>
            <div className="container">
              <p>
                Sunset:
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>
              <img
                className="image"
                src={"https://cdn-icons-png.flaticon.com/512/362/362409.png"}
              />
            </div>
            {/* <p>
            {isDaytime
              ? "Sunset: " +
                new Date(weather.sys.sunset * 1000).toLocaleTimeString()
              : "Sunrise: " +
                new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </p> */}
                  </div>
                  
        </div>
      )}
    </div>
  );
};

export default City;
