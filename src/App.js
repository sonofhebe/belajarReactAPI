// import logo from './logo.svg';
import "./App.css";
import { getmovie, searchmovie } from "./api";
import { useState, useEffect } from "react";

const App = () => {
  const [popular, setpopular] = useState([]);

  useEffect(() => {
    getmovie().then((result) => {
      setpopular(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchmovie(q);
      setpopular(query.results);
    }
  };

  const Popularmovie = () => {
    return popular.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-date">Release : {movie.release_date}</div>
          <div className="movie-rate">Rate : {movie.vote_average}</div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CARI FILM</h1>
        <input
          placeholder="Ketik Judul..."
          className="search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <Popularmovie />
        </div>
      </header>
    </div>
  );
};

export default App;
