import React, { useState } from 'react';
import './App.css';
import Row from './Row';
import request from './request'
import Banner from './Banner';
import Navbar from './Navbar';
import MovieSelect from './MovieSelect';

function App() {
const [movieDetails, setmovieDetails] = useState()
// const [isCloseClicked, setisCloseClicked] = useState(false)
  function handleChange(data) {
  
  setmovieDetails(data)
  }
  function onClose() {
  
    setmovieDetails('')

    }
  return (

    <div className="App">
   <div className= {` ${movieDetails && 'nav'}`}><Navbar  handleChange={handleChange} fetchURL ={request.movieTitle}></Navbar></div>
      {!movieDetails && <div><Banner></Banner>
     <Row title="NETFLIX ORIGINALS" isLargeRow fetchURL={request.fetechNetflixOrginals}> </Row>
     <Row title="Trending Now" fetchURL={request.fetchTrending}> </Row>
     <Row title="Top Rated" fetchURL={request.fetchtopRated}> </Row>
     <Row title="Action" fetchURL={request.fetechActionMovies}> </Row>
     <Row title="Comedy" fetchURL={request.fetechComedyMovies}> </Row>
     <Row title="Horror" fetchURL={request.fetechHorrorMovies}> </Row>
     <Row title="Romance" fetchURL={request.fetechRomanceMovies}> </Row>
     <Row title="Documentry" fetchURL={request.fetechDocumentries}> </Row>
     </div>}
     {movieDetails && <div>
       <MovieSelect movieDetails={movieDetails} close={onClose}></MovieSelect></div>}

     </div>
  );
}

export default App;
