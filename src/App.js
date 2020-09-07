import React from 'react';
import './App.css';
import Row from './Row';
import request from './request'
import Banner from './Banner';
import Navbar from './Navbar';

function App() {
  return (

    <div className="App">
      <Navbar></Navbar>
      <Banner></Banner>
     <Row title="NETFLIX ORIGINALS" isLargeRow fetchURL={request.fetechNetflixOrginals}> </Row>
     <Row title="Trending Now" fetchURL={request.fetchTrending}> </Row>
     <Row title="Top Rated" fetchURL={request.fetchtopRated}> </Row>
     <Row title="Action" fetchURL={request.fetechActionMovies}> </Row>
     <Row title="Comedy" fetchURL={request.fetechComedyMovies}> </Row>
     <Row title="Horror" fetchURL={request.fetechHorrorMovies}> </Row>
     <Row title="Romance" fetchURL={request.fetechRomanceMovies}> </Row>
     <Row title="Documentry" fetchURL={request.fetechDocumentries}> </Row>

     </div>
  );
}

export default App;
