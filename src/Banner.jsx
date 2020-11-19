import React, { useState, useEffect } from "react";
import "./banner.css";

let baseImageUrl = "https://image.tmdb.org/t/p/original";
function Banner({ movieList }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    setMovies(movieList[Math.floor(Math.random() * movieList.length)]);
    // console.log(movieList[Math.floor(Math.random() * movieList.length)]);
  }, [movieList]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${baseImageUrl}${movies?.backdrop_path})`,
      }}
    >
      <div className="banner-contents">
        {/* title */}
        <h2 className="title">
          {movies?.title || movies?.name || movies?.original_name}
        </h2>
        {/* buttons */}
        <div className="banner-btns">
          <button className="btn1">Play</button>
          <button className="btn2">My List</button>
        </div>
        {/* example */}
        <p className="text">{truncate(movies?.overview, 200)}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
