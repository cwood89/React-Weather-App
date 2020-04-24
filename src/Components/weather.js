import React, { useState, useEffect } from 'react';
import { getCurrentPosition, formatTemp, getTime } from "../utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Weather() {
  
  const [temp, setTemp] = useState("0 \xB0");
  const [city, setCity] = useState("City");
  const [description, setDescription] = useState("Description");
  const [time, setTime] = useState("0:00");
  const [img, setImg] = useState();
  const [showForm, setShowForm] = useState(false);
  const [zip, setZip] = useState('');

  const imgURL = `http://openweathermap.org/img/wn/${img}@2x.png`;
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await getCurrentPosition() || {}.catch(e => console.log("Error: ", e.message));
      if (coords === undefined) {
        return
      }
      const { latitude, longitude } = coords;
  
      let api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).catch(e => console.log("Error: ", e.message));
       
      let data = await api_call.json();

      if (data.cod === "404") {
        return
      } else {
        setImg(data.weather[0].icon);
        setTemp(formatTemp(data.main.temp));
        setCity(data.name);
        setDescription(data.weather[0].description);
        setTime(getTime(data.timezone));
      }
    }
    getLocation();
  }, [API_KEY]) // will only re-run if api key changes

  const zipLocation = async (zipcode) => {
    let api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}`).catch(e => console.log("Error: ", e.message));
       
    let data = await api_call.json();
    console.log(data)
    if (data.cod === "404") {
      return
    } else {
      setTemp(formatTemp(data.main.temp));
      setImg(data.weather[0].icon);
      setCity(data.name);
      setDescription(data.weather[0].description);
      setTime(getTime(data.timezone));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    zipLocation(zip);
    setShowForm(false);
    e.target.reset();
    setZip('')
  }

  const toggleForm = () => {
    if (showForm === false) {
      return (
        <Button variant="primary" onClick={() => setShowForm(true)}>Pick a location!</Button>)
    } else {
      return (
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="searchZipCode">
                <Form.Control
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                  className="input-sm" name="zip" type="number" placeholder="Enter a zip code!" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )
    }
  }

  return (
    
    <div className=" text-uppercase text-white text-center px-4">
      {img ? <img src={imgURL} alt={description} /> : null}
      <h1 className="header">{temp}</h1>
      <p>{description}</p>
      <p>{city}</p>
      <p>{time}</p>
      {toggleForm()}
    </div>
  )
}