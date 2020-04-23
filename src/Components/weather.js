import React, { useState, useEffect } from 'react';
import { getCurrentPosition, formatTemp, getTime } from "../utils";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
export default function Weather() {
  
  const [temp, setTemp] = useState("0 \xB0");
  const [city, setCity] = useState("City");
  const [description, setDescription] = useState("Description");
  const [time, setTime] = useState("0:00");
  const [img, setImg] = useState()
  const[showForm , setShowForm] = useState(false)
  const imgURL = `http://openweathermap.org/img/wn/${img}@2x.png`
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await getCurrentPosition().catch(e => console.log("Error: ", e.message));
      const { latitude, longitude } = coords;
  
      let api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).catch(e => console.log("Error: ", e.message));
       
      let data = await api_call.json()
      console.log(data);
      setImg(data.weather[0].icon)
      setTemp(formatTemp(data.main.temp));
      setCity(data.name);
      setDescription(data.weather[0].description);
      setTime(getTime(data.timezone));
     
    }
    getLocation();
  }, [API_KEY]) // will only re-run if api key changes

  const zipLocation = async (zip) => {
    let api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?${zip}&appid=${API_KEY}`).catch(e => console.log("Error: ", e.message));
       
      let data = await api_call.json()
      console.log(data);
      setTemp(formatTemp(data.main.temp));
      setCity(data.name);
      setDescription(data.weather[0].description);
      setTime(getTime(data.timezone));
  }

  const toggleForm = () => {
    if (showForm === false) {
      return (
        <Button variant="primary" onClick={() => setShowForm(true)}>Pick a location!</Button>)
    } else {
      return (
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter a zip code!" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )
    }
  }

  return (
    <div className=" text-uppercase text-white text-center px-4">
      <img src={imgURL} alt={description}/>
      <h1 className="header">{temp}</h1>
      <p>{description}</p>
      <p>{city}</p>
      <p>{time}</p>
      {toggleForm()}
    </div>
  )
}