import React from 'react';
import { useState,useEffect } from 'react';
import Card from 'react-bootstrap'
import './WeatherApp.css';
import search_icon from './Assets/search.png';
import clear_icon from './Assets/clear.png';
import drizzle_icon from './Assets/drizzle.jpeg';
import rain_icon from './Assets/rainy.png';
import snow_icon from './Assets/snow.png';
import wind_icon from './Assets/wind.png';
import cloud_icon from './Assets/cloud.png';
import humidity_icon from './Assets/humidity.png';

export const WeatherApp = () => {
  const [name,setName] = useState("");
  const [wind,setWind]= useState(0);
  const [temp,setTemp]= useState(0);
  const [humidity,setHumidity]= useState(0);
  const [city, setCity] = useState("");
  let city_name = ""
  const search = async () => {
    let cityname = name;
    if (cityname === "") {
      return 0;
    }
    const key = "8f7d6975c8cfba9c300d75f334bf084f"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    setWind(data.wind.speed);
    setTemp(data.main.temp);
    setHumidity(data.main.humidity);
    setCity(data.name);
  }

  const cityName = (e) => {
    setName(e.target.value);
  }
  return (
    <div className="card">
      <div className="search">
        <input onChange = {cityName} type="text" className="search-input" placeholder='Enter city' spellCheck="false"/>
        <button onClick={()=>{search()}}><img src={search_icon} /></button>
      </div>
      <div className="weather">
        <img src = {rain_icon} className='weather-icon'/>
        <h1 className='temp'>{temp}°c</h1>
        <h2 className="city">{city}</h2>
        <div className="details">
          <div className="col d-flex align-items-center me-2">
            <div>
              <img src={humidity_icon} />
            </div>
            <div>
              <p className='humidity m-0'>{humidity}%</p>
              <p className='m-0'>Humidity</p>
            </div>
          </div>
          <div className="co d-flex align-items-center">
            <div className='me-2'>
              <img src={wind_icon} />
            </div>
            <div>
              <p className='wind m-0'>{wind}km/h</p>
              <p className='m-0'>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
