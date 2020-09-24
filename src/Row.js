import React, { useState,useEffect } from 'react'
import {instance,local} from './axios'

import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
function Row({title,fetchURL,isLargeRow,recommendedMovies}) {
    const [movies, setMovies] = useState([]);
    const [recommendedMoviesData, setRecommendedMoviesData] = useState([]);

    const [trailerUrl, setTrailerUrl] = useState('');

    const img_base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(() => {
        async function fetchData(){
            const request = await instance.get(fetchURL)
            setMovies(request.data.results);
            return request;
        }
        if(recommendedMovies){
            setRecommendedMoviesData(recommendedMovies)
        }
        fetchData()
    }, [fetchURL, recommendedMovies])
    const opts={
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1
        }
    };
    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl('')
        }else{

            movieTrailer(movie?.name ||"").then(url =>{

                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"))
            }).catch((err)=>{console.log(err)})
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                  {movies && movies.map((movie) =>  (
                  <img className= {`row_poster ${isLargeRow && 'row_poster_large'}`}
                  key={movie.id}
                  onClick= {()=> handleClick(movie)} 
                  src={ `${img_base_url}${!isLargeRow? movie.backdrop_path :movie.poster_path}`} alt={movie.name}></img>
                  ))}
                  {recommendedMovies && recommendedMovies.map((posterDetails) =>  (
                //   <div className="poster_container">
                  <img className= {`row_poster ${isLargeRow && 'row_poster_large'}`}
                  key={posterDetails.id}
                //   onClick= {()=> handleClick(movie)} 
                  src={ posterDetails.poster} ></img>
                //    <span className="poster_name">{posterDetails?.name}</span>
                //  </div> 
                  ))}
             </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
        </div>
    )
}

export default Row
