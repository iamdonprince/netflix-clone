import "./App.css";
import Row from "./Row";
import requests from "./request";
import Banner from "./Banner";
import Nav from "./Nav";
import axios from "./axios";
import { useEffect, useState } from "react";

function App() {
  const [movieList, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(request.data.results);
      // console.log(title, request.data.results);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* nav */}
      <Nav></Nav>
      <Banner movieList={movieList}></Banner>
      <div className="list">
        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        ></Row>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending}></Row>
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated}></Row>
        <Row title="Actions Movies" fetchUrl={requests.fetchActionMovies}></Row>
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}></Row>
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}></Row>
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
        ></Row>
        <Row
          title="Documantries Movies"
          fetchUrl={requests.fetchDocumantries}
        ></Row>
      </div>

      <div class="copyright">
        Neflix Clone &copy; by &nbsp;
        <a href="http://princekumar.netlify.app" class="link">
          prince kumar
        </a>
        .
      </div>

      {movieList.length <= 0 && (
        <div className="loading">
        <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      )}
    </div>
  );
}

export default App;
