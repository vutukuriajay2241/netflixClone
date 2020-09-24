import React from "react";
import "./MovieSelect.css";
import Row from './Row';

import closeIcon from "./assets/close.svg";

function MovieSelect({ movieDetails, close }) {
  return (
    <div>
      <div className="backgroundContainer">
        <img
          className="close"
          src={closeIcon}
          onClick={() => close()}
          alt="Close"
        ></img>
        <div
          className="poster_movie"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${movieDetails.background_path})`,
            backgroundPosition: "center center",
          }}
          
        >
            
        </div>
      </div>
      <div className='details_container'>
      <div className="movie_title">{movieDetails.title}</div>
      <div style={{paddingLeft:20,paddingRight:20}}>
      <div  style={{paddingTop:20}} className="banner_buttons">
        <button className="movie_button">Play</button>
        <button className="movie_button">Add to List</button>
      </div>
      <div style={{paddingTop:20}}>
      {movieDetails.overview}
      </div>
      <div style={{paddingTop:20}}>
      <span style={{color:'yellow',paddingRight:15}}>IMDb </span>{(movieDetails.vote_average)}
      </div>
      <div>
      <span style={{paddingRight:15, paddingTop:20}}>{movieDetails.release_date} </span>
      <span style={{paddingRight:5, paddingTop:20}}>{movieDetails.runtime} </span>
        
        
      </div>
      <div  style={{paddingTop:20}}>
        {movieDetails.genres}
      </div>
      
      </div>
     </div>
      <Row  title="More Like This" recommendedMovies={movieDetails.movie_cards} > </Row>
      <Row isLargeRow title="Cast" recommendedMovies={movieDetails.casts} > </Row>
      <div className="reviews">
      <h2 className='review_title'>Customer reviews</h2>
          <div className="reviews">
            {movieDetails.reviews.map((movieDetailsReview) =>  (
                  <div  style={{paddingTop:20 , color: movieDetailsReview.status == 'Good'? 'green': 'red'}} key={movieDetailsReview.id}
                  >
                    {movieDetailsReview.review}
                  </div>
                  ))}
          </div>
      </div>
    </div>
  );
}

export default MovieSelect;
