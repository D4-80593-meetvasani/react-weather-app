// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=f5bf02d39c705659b32c45faef59151a

import React, { useEffect, useState } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temperature = () => {
  const [searchValue, setSearchValue] = useState("valsad");

  const [ tempInfo , setTempInfo ] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=f5bf02d39c705659b32c45faef59151a`;

      let response = await fetch(url);

      let data = await response.json();

      const { temp, humidity, pressure } = data.main;

      const { main: weathermood } = data.weather[0];

      const { name } = data;

      const { speed } = data.wind;

      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);
  

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search here"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            search
          </button>
        </div>
      </div>

      {/* temperature card */}
      <Weathercard tempInfo = {tempInfo} />
    </>
  );
};

export default Temperature;
