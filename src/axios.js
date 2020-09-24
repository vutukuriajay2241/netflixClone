import axios from "axios";

const instance= axios.create({
    baseURL: "https://api.themoviedb.org/3",
})
const local= axios.create({
    baseURL: "https://netflix-clone-api.herokuapp.com/",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',}   
})


export {instance,local};