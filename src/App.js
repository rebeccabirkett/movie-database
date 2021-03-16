import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Item from './components/Item';

//components
import Movie from './components/Movie';
import TopRated from './components/TopRated';
import Latest from './components/Latest';

//images
import Neon from './images/neon.png';

//dotenv
require('dotenv').config();   

//variables
const key = process.env.REACT_APP_TMDB_API_KEY;
const POPULAR_API = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-UK&sort_by=popularity.desc&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${key}&query=`; 

// Home page app
function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    getPopular(POPULAR_API);
  }, []);

  const getPopular = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      }); 
  }

  // search bar functionality
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getPopular(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <h1 className="title">MOVIE TIEM📽️</h1>
        <img className="neon" src={Neon} alt="neon" />
        <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="search" 
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>

      <Carousel 
        itemsToShow={1}
        focusOnSelect={true}
      >
        <div className="movie-container">
          <div className="subtitle">
            <h3 id="focus">POPULAR</h3>
            <h3>TOP RATED</h3>
            <h3>LATEST</h3>
          </div>
          <Item id="popular">
            {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
          </Item>
        </div>
        <div className="movie-container">
          <div className="subtitle">
            <h3>POPULAR</h3>
            <h3 id="focus">TOP RATED</h3>
            <h3>LATEST</h3>
          </div>
          <TopRated />
        </div>
        <div className="movie-container">
          <div className="subtitle">
            <h3>POPULAR</h3>
            <h3>TOP RATED</h3>
            <h3 id="focus">LATEST</h3>
          </div>
          <Latest />
        </div>
      </Carousel>

      <footer>
        <h4>Made by <a id="github" href="http://github.com/rebeccabirkett">Bex Birkett</a>🌵 Created with React</h4>
      </footer>
    </>
  );
}

export default App;
