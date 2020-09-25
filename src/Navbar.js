import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import userAvatar from "./assets/user_avatar.png";
import { instance, local } from "./axios";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import search from "./assets/search.png";
import "./Navbar.css";
function Navbar({ fetchURL,handleChange }) {
  const [show, handleShow] = useState(false);
  const [searchText, updateText] = useState("");
  const [loader, setLoader] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [movieDetails, setMovieDetails] = useState("");
  const [recommendedMovies, setRecommendedMovieDetails] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  const updateTextValue = (event) => {
    updateText(event.target.value);
  };
  const handleKeypress = e => {
    //it triggers by pressing the enter key
    console.log(e)
  if (e.key === 'Enter') {
    handleClick(searchText);
  }
};

  const handleClick = (searchText) => {
    async function get_movie_posters(arr) {
      var arr_poster_list = [];
      var promises = [];
      for (var m in arr) {
        promises.push(
          instance.get(fetchURL + arr[m]).then((request) => {
            console.log(request);
            arr_poster_list.push(
              "https://image.tmdb.org/t/p/original" +
                request.data.results[0].backdrop_path
            );
          })
        );
      }

      await Promise.all(promises).then(() => {
        return arr_poster_list;
      });
      return arr_poster_list;
    }
    async function get_movie_cast(movie_id) {
      var cast_ids = [];
      var cast_names = [];
      var cast_chars = [];
      var cast_profiles = [];

      var top_10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var top_cast = [];
      var promises = [];
      promises.push(
        instance
          .get(
            `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=646c74cb1b97bfe3e9e17a9a8761a61e`
          )
          .then((my_movie) => {
            my_movie = my_movie.data;
            if (my_movie.cast.length >= 10) {
              top_cast = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            } else {
              top_cast = [0, 1, 2, 3, 4];
            }
            for (var my_cast in top_cast) {
              cast_ids.push(my_movie.cast[my_cast].id);
              cast_names.push(my_movie.cast[my_cast].name);
              cast_chars.push(my_movie.cast[my_cast].character);
              cast_profiles.push(
                "https://image.tmdb.org/t/p/original" +
                  my_movie.cast[my_cast].profile_path
              );
            }
          })
      );
      await Promise.all(promises).then(() => {
        return {
          cast_ids: cast_ids,
          cast_names: cast_names,
          cast_chars: cast_chars,
          cast_profiles: cast_profiles,
        };
      });

      return {
        cast_ids: cast_ids,
        cast_names: cast_names,
        cast_chars: cast_chars,
        cast_profiles: cast_profiles,
      };
    }

    async function get_individual_cast(movie_cast) {
      var cast_bdays = [];
      var cast_bios = [];
      var cast_places = [];
      var promises = [];
      for (var cast_id in movie_cast.cast_ids) {
        promises.push(
          instance
            .get(
              `https://api.themoviedb.org/3/person/${movie_cast.cast_ids[cast_id]}?api_key=646c74cb1b97bfe3e9e17a9a8761a61e`
            )
            .then((cast_details) => {
              cast_bdays.push(
                new Date(cast_details.birthday)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")
              );
              cast_bios.push(cast_details.biography);
              cast_places.push(cast_details.place_of_birth);
            })
        );
      }
      await Promise.all(promises).then(() => {
        return {
          cast_bdays: cast_bdays,
          cast_bios: cast_bios,
          cast_places: cast_places,
        };
      });
      return {
        cast_bdays: cast_bdays,
        cast_bios: cast_bios,
        cast_places: cast_places,
      };
    }
    async function get_movie_details(movie_id, arr, movie_title) {
      var movie_details = await instance.get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=646c74cb1b97bfe3e9e17a9a8761a61e`
      );
      movie_details = movie_details.data;
      var imdb_id = movie_details.imdb_id;
      var poster =
        "https://image.tmdb.org/t/p/original" + movie_details.poster_path;
      var overview = movie_details.overview;
      var genres = movie_details.genres;
      var background_path = "https://image.tmdb.org/t/p/original" +movie_details.backdrop_path
      var rating = movie_details.vote_average;
      var vote_count = movie_details.vote_count;
      var release_date = new Date(movie_details.release_date);
      var runtime = parseInt(movie_details.runtime);
      var status = movie_details.status;
      var genre_list = [];
      for (var genre in genres) {
        genre_list.push(genres[genre].name);
      }
      var my_genre = genre_list.join(", ");
      if (runtime % 60 == 0) {
        runtime = Math.floor(runtime / 60) + " hour(s)";
      } else {
        runtime =
          Math.floor(runtime / 60) + " hour(s) " + (runtime % 60) + " min(s)";
      }
      var details;
      var arr_poster = get_movie_posters(arr);

      var movie_cast = get_movie_cast(movie_id);

      var ind_cast = get_individual_cast(movie_cast);
      let promises = [];
      promises.push(
        get_movie_posters(arr).then((data) => {
          arr_poster = data;
        })
      );
      promises.push(
        get_movie_cast(movie_id).then((data) => {
          movie_cast = data;
        })
      );
      promises.push(
        get_individual_cast(movie_cast).then((data) => {
          ind_cast = data;
        })
      );
      Promise.all(promises).then(() => {
        console.log(arr_poster, movie_cast, ind_cast);

        var details = {
          title: movie_title,
          cast_ids: JSON.stringify(movie_cast.cast_ids),
          cast_names: JSON.stringify(movie_cast.cast_names),
          cast_chars: JSON.stringify(movie_cast.cast_chars),
          cast_profiles: JSON.stringify(movie_cast.cast_profiles),
          cast_bdays: JSON.stringify(ind_cast.cast_bdays),
          cast_bios: JSON.stringify(ind_cast.cast_bios),
          cast_places: JSON.stringify(ind_cast.cast_places),
          imdb_id: imdb_id,
          poster: poster,
          background_path: background_path,
          genres: my_genre,
          overview: overview,
          rating: rating,
          vote_count: String(vote_count),
          release_date: release_date
            .toDateString()
            .split(" ")
            .slice(1)
            .join(" "),
          runtime: runtime,
          status: status,
          rec_movies: JSON.stringify(arr),
          rec_posters: JSON.stringify(arr_poster),
        };
        console.log(details);
        local.post("/recommend", details).then(function (response) {
          console.log(response);
          setLoader(false,handleChange(response.data))
        });
      });
    }
    async function recomendedMoviesData(movie_title, movie_id) {
      const recs = await local.get(`/similarity?name=${movie_title}`);
      // setRecommendedMovieDetails(recs);
      if (
        recs ==
        "Sorry! The movie you requested is not in our database. Please check the spelling or try with some other movies"
      ) {
      } else {
        console.log(recs);
        var movie_arr = recs.data.split("---");
        var arr = [];
        for (const movie in movie_arr) {
          arr.push(movie_arr[movie]);
        }
        get_movie_details(movie_id, arr, movie_title);
      }

      return recs.data;
    }
    async function fetchData() {
      const request = await instance.get(fetchURL + searchText);
      // setMovieDetails(requests.data.results);
      var requests = request.data;
      var movie_id = requests.results[0].id;
      var movie_title = requests.results[0].original_title;
      console.log(requests);
      recomendedMoviesData(movie_title, movie_id);

      return requests;
    }
    if (!showSearchBox && !fetchData){
      return setShowSearchBox(!showSearchBox)

    }
    if (searchText){
      return setLoader(true,fetchData());
    }
    setShowSearchBox(!showSearchBox)
  };
  return (
    <div className={`navbar  ${show && "nav_black"}`}>
      <img className="logo" src={logo} alt="Logo"></img>
      <div className="navOptionsContainer">{showSearchBox && <div className="searchContainer"><input
        type="text"
        placeholder="Movie Title"
        className="searchBox"
        value={searchText}
        onKeyPress={handleKeypress}
        onChange={(event) => {
          updateText(event.target.value);
        }}
      ></input>
      <img
        className="search"
        onClick={() => handleClick(searchText)}
        src={search}
        alt="search"
      ></img>
        {loader && <div className="loader">
      <Loader
         type="TailSpin"
         color="#ffffff"
         height={22}
         width={22}
        //  timeout={3000} //3 secs
 
        /></div>}</div>}
      {!showSearchBox &&<img
        className="searchOnly"
        onClick={() => handleClick(searchText)}
        src={search}
        alt="search"
      ></img>}
      
      <img className="user_avatar" src={userAvatar} alt="avatar"></img></div>
    </div>
  );
}

export default Navbar;
