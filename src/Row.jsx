import React, { useEffect, useState } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";
let baseImageUrl = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(title, request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const scrowidth = (e) => {
    console.log(e);
    console.log(document.querySelector(".post_containers").scrollWidth);
  };

  const trailerPopUp = (data) => {
    let names = data?.title || data?.name || data?.original_name;
    if (!trailerId) {
      movieTrailer(names, { id: true }).then((response) =>
        setTrailerId(response)
      );
    } else setTrailerId("");
  };

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    console.log(x);
    let listW = movies.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="row">
      {/* title */}
      <h1>{title}</h1>

      <div
        className="movieRow-left "
        style={{ height: `${isLargeRow && "250px"}` }}
        onClick={handleLeftArrow}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: 30 }} />
      </div>

      <div
        className="movieRow-right"
        style={{ height: `${isLargeRow && "250px"}` }}
        onClick={handleRightArrow}
      >
        <i className="fas fa-chevron-right" style={{ fontSize: 30 }} />
      </div>

      <div
        onClick={scrowidth}
        className="post_containers"
        style={{
          marginLeft: scrollX,
        }}
      >
        {/* posts movies list */}
        {movies.map((data) => {
          return (
            <img
              onClick={() => trailerPopUp(data)}
              key={data.id}
              className={`image ${isLargeRow && "img_LargeImg"}`}
              src={`${baseImageUrl}${
                isLargeRow
                  ? data.poster_path
                  : data.backdrop_path
                  ? data.backdrop_path
                  : data.poster_path
              }`}
              alt={data.name}
            />
          );
        })}
      </div>
      {trailerId && <YouTube videoId={trailerId} opts={opts} />}
    </div>
  );
}

export default Row;
