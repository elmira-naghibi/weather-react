import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "./Api";
import DateUtil from "./DateUtil";
import "./Forecast.css";
import WeatherIcon from "./WeatherIcon";

function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);

  const refresh = () => {
    let url = `${Api.url}/data/2.5/forecast?appid=${Api.key}&units=metric&q=${city}`;

    axios.get(url).then((response) => {
      let forecastData = response.data.list;
      // The API returns the forecast every 3 hours, so we are extracting
      // the weather for every 24 hours, which is 8 times 3 hour cycles
      let dailyForecast = [7, 15, 23, 31, 39].map((index) => {
        return {
          description: forecastData[index].weather[0].main,
          icon: forecastData[index].weather[0].icon,
          precipitation: Math.round(forecastData[index].main.humidity) + "%",
          temperature: Math.round(forecastData[index].main.temp),
          day: new DateUtil(new Date(forecastData[index].dt * 1000)).day(true),
          wind: Math.round(forecastData[index].wind.speed) + "km/h",
        };
      });
      setForecast(dailyForecast);
    });
  };

  useEffect(() => {
    refresh();
  }, [city]);

  if (forecast.length > 0) {
    return (
      <div className="row">
        {forecast.map((weather, index) => (
          <div className="col-sm-2" key={index}>
            <div className="forecast-day">{weather.day}</div>
            <div className="forecast-icon">
              <WeatherIcon iconName={weather.icon} />
            </div>
            <div className="forecast-temperature">{weather.temperature}°</div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div />;
  }
}

export default Forecast;
