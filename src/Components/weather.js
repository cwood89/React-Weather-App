import React, { useState, useEffect } from 'react';
import { getCurrentPosition, formatTemp, getTime } from "../utils";

export default function Weather() {
  
  const [temp, setTemp] = useState("0 \xB0");
  const [city, setCity] = useState("City");
  const [description, setDescription] = useState("Description");
  const [time, setTime] = useState("0:00");

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await getCurrentPosition().catch(e => console.log("Error: ", e.message));
      const { latitude, longitude } = coords;
  
      let api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).catch(e => console.log("Error: ", e.message));
       
      let data = await api_call.json()
      console.log(data);
      setTemp(formatTemp(data.main.temp));
      setCity(data.name);
      setDescription(data.weather[0].description);
      setTime(getTime(data.timezone));
     
    }
    getLocation();
  }, [API_KEY]) // will only re-run if api key changes


  return (
    <div className="text-white px-4">
    <h1 className="header">{temp}</h1>
    <p>{city}</p>
    <p>{description}</p>
    <p>{time}</p>
    </div>
  )
}