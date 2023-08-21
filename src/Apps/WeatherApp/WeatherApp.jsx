import React from 'react';
import { useState } from 'react';
import './WeatherApp.css';
import search_icon from './Assets/search.png';
import clear_icon from './Assets/clear.png';
import drizzle_icon from './Assets/drizzle.png';
import rain_icon from './Assets/rainy.png';
import snow_icon from './Assets/snow.png';
import wind_icon from './Assets/wind.png';
import cloud_icon from './Assets/cloud.png';
import humidity_icon from './Assets/humidity.png';

export const WeatherApp = () => {
  const key = "8f7d6975c8cfba9c300d75f334bf084f"
  const [name,setName] = useState("");
  const [wind,setWind]= useState(0);
  const [temp,setTemp]= useState(0);
  const [humidity,setHumidity]= useState(0);
  const [city, setCity] = useState("");
  const [wicon,setWicon] = useState(cloud_icon);
  const [error, setError] = useState(null);

  const search = async () => {
    let cityname = name;
    if (cityname === "") {
      return 0;
    }
    setName("");
  }

  const cityName = (e) => {
    setName(e.target.value);
  }

  const fetchData = async  () => {
    setError("")
    try {
      if(name !== "") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`;
        const responseData = await fetch(url);
        if (responseData.statusText !== "OK") {
          throw new Error('Network response was not ok');
        }
        const apiresponsedata = await responseData.json();
        setWind(Math.floor(apiresponsedata.wind.speed)+"km/h");
        let celsius = apiresponsedata.main.temp-273.15
        celsius = celsius.toFixed(2);
        setTemp(Math.floor(celsius)+"°C");
        setHumidity(apiresponsedata.main.humidity+"%");
        setCity(apiresponsedata.name);
        if(apiresponsedata.weather[0].icon === "01d" || apiresponsedata.weather[0].icon === "01n" ) {
          setWicon(clear_icon)
        }
        else if(apiresponsedata.weather[0].icon === "02d" || apiresponsedata.weather[0].icon === "02n" ) {
          setWicon(cloud_icon)
        }
        else if(apiresponsedata.weather[0].icon === "09d" || apiresponsedata.weather[0].icon === "09n" ) {
          setWicon(rain_icon)
        }
        else if(apiresponsedata.weather[0].icon === "03d" || apiresponsedata.weather[0].icon === "03n" ) {
          setWicon(drizzle_icon)
        }
        else if(apiresponsedata.weather[0].icon === "13d" || apiresponsedata.weather[0].icon === "13n" ) {
          setWicon(snow_icon)
        }
        else {
          setWicon(snow_icon)
        }
      }
    }
    catch(error){
      setError("please write correc city name");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  } 

  return (
    <div className="card weather">
      <div className="search">
        <input 
          onChange = {cityName} 
          onKeyPress={handleKeyDown} 
          type="text" 
          className="search-input" 
          placeholder='Enter City' 
          spellCheck="false"
          value = {name}
        />
        <button onClick={()=>{search()}}><img src={search_icon} alt="search_icon"/></button>
      </div>
      { !error && ( 
        <div>
          <img src = {wicon} className='weather-icon' alt="weather-icon"/>
          <h1 className='temp'>{temp}</h1>
          <h2 className="city">{city}</h2>
          <div className="details">
            <div className="col d-flex align-items-center me-2">
              <div>
                <img src={humidity_icon} alt="himidity_icon"/>
              </div>
              <div>
                <p className='humidity m-0'>{humidity}</p>
                <p className='m-0'>Humidity</p>
              </div>
            </div>
            <div className="co d-flex align-items-center">
              <div className='me-2'>
                <img src={wind_icon} alt="wind_icon"/>
              </div>
              <div>
                <p className='wind m-0'>{wind}</p>
                <p className='m-0'>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p className='mt-5'>Error: {error}</p>}
    </div>
  )
}

export default WeatherApp
