import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import Item from './Item';

require('dotenv').config();

//variables
const key = process.env.REACT_APP_TMDB_API_KEY;
const TOP_RATED_API = `https://api.themoviedb.org/3/movie/top_rated?&api_key=${key}&language=en-US&page=1`;

// app function
function TopRated() {
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    getTopRated(TOP_RATED_API);
  }, []);

  const getTopRated = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      }); 
  }

  return (
    <Item>
      {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </Item>
  );
}

export default TopRated;