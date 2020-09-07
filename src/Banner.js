import React, { useState, useEffect } from "react";
import axios from "./axios";
import request from "./request";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(request.fetechNetflixOrginals);
      setMovie(
        requests.data.results[
          Math.floor(Math.random() * requests.data.results.length)
        ]
      );
      return requests;
    }
    fetchData();
  }, []);
  function text_truncate(str, maxLength) {
    if (str?.length > maxLength) {
      return str.substring(0, maxLength - 1) + "...";
    } else {
      return str;
    }
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <div className="banner_description">
          {text_truncate(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner_fade_bottom"></div>

    </header>
  );
}

export default Banner;
