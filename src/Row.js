import React, { useState,useEffect } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
function Row({title,fetchURL,isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const img_base_url = "https://image.tmdb.org/t/p/original/"
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchURL)
            setMovies(request.data.results);
            return request;
        }
        fetchData()
    }, [fetchURL])
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
                  {movies.map((movie) =>  (
                  <img className= {`row_poster ${isLargeRow && 'row_poster_large'}`}
                  key={movie.id}
                  onClick= {()=> handleClick(movie)} 
                  src={ `${img_base_url}${!isLargeRow? movie.backdrop_path :movie.poster_path}`} alt={movie.name}></img>
                  ))}
             </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
        </div>
    )
}

export default Row
