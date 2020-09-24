const api_key= '646c74cb1b97bfe3e9e17a9a8761a61e';

const requests= {
    fetchTrending: `/trending/all/week?api_key=${api_key}&language=en-US`,
    fetechNetflixOrginals: `/discover/tv?api_key=${api_key}&with_networks=213`,
    fetechActionMovies:  `/discover/movie?api_key=${api_key}&with_genres=28`,
    fetechComedyMovies:  `/discover/movie?api_key=${api_key}&with_genres=35`,
    fetechHorrorMovies:  `/discover/movie?api_key=${api_key}&with_genres=27`,
    fetechRomanceMovies:  `/discover/movie?api_key=${api_key}&with_genres=10749`,
    fetechDocumentries:  `/discover/movie?api_key=${api_key}&with_genres=99`,
    fetchtopRated: `/movie/top_rated?api_key=${api_key}&language=en-US`,
    movieTitle: `/search/movie?api_key=${api_key}&query=`,
    movieDetails:`/movie`
}

export default requests;