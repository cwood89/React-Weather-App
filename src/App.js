import React from 'react';
import Weather from './Components/weather';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function App() {
  return (
    <Container className="p-3">
      <Jumbotron className="card card-image gradient">
        <Weather />
      </Jumbotron>
    </Container>
  );
}


