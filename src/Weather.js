import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./Weather.css";
import WeatherIcon from "./WeatherIcon";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";
import DateUtil from "./DateUtil";
import Api from "./Api";
import Forecast from "./Forecast";

function Weather({ city }) {
  console.log(city);
  const [weather, setWeather] = useState(null);

  const refreshWeatherFromParams = (params) => {
    let url = `${Api.url}/data/2.5/weather?appid=${Api.key}&units=metric&${params}`;
    axios.get(url).then((response) => {
      setWeather({
        description: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        precipitation: Math.round(response.data.main.humidity) + "%",
        temperature: Math.round(response.data.main.temp),
        time: new DateUtil(new Date(response.data.dt * 1000)).dayTime(),
        wind: Math.round(response.data.wind.speed) + "km/h",
      });
    });
  };

  const refreshWeatherFromLatitudeAndLongitude = (latitude, longitude) => {
    refreshWeatherFromParams(`lat=${latitude}&lon=${longitude}`);
  };
  const refresh = (city) => {
    refreshWeatherFromParams(`q=${city}`);
  };
  useEffect(() => {
    const fetcher = (city) => {
      refreshWeatherFromParams(`q=${city}`);
    };
    fetcher(city);
  }, [city]);

  return (
    <div>
      <div className="clearfix">
        <Search refresh={refresh} />
        <CurrentLocation refresh={refreshWeatherFromLatitudeAndLongitude} />
      </div>

      {weather ? (
        <div className="weather-summary">
          <div className="weather-summary-header">
            <h1>{city}</h1>
            <div className="weather-detail__text">{weather.time}</div>
            <div className="weather-detail__text">{weather.description}</div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="clearfix">
                <div className="float-left weather-icon">
                  <WeatherIcon iconName={weather.icon} />
                </div>
                <div className="weather-temp weather-temp--today">
                  {weather.temperature}
                </div>
                <div className="weather-unit__text weather-unit__text--today">
                  °C
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="weather-detail__text">
                Precipitation: {weather.precipitation}
              </div>
              <div className="weather-detail__text">Wind: {weather.wind}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          App is loading, <em>please wait...</em>
        </div>
      )}

      {weather && <Forecast city={city} />}
    </div>
  );
}

Weather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Weather;
