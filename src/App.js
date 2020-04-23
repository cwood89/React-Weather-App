import React from 'react';
import Weather from './Components/weather';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from "./images/logo512.png";

export default function App() {
  return (
    <>
      <Container className="p-3">
        <Jumbotron className="card card-image gradient pt-3">
          <div className="d-flex">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="The weather app logo"
            />
            <h3 className="px-3">The Weather App</h3>
          </div>
          <Weather />
        </Jumbotron>
      </Container>
    </>
  );
}


