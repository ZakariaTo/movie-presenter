import React, { useEffect, useState } from "react";
import Axios from "axios-observable";
import { API_KEY } from "../constants/constants";
import LoadingDotsIcon from "./LoadingDotsIcon";
import NotFound from "./NotFound";

import "../styles/movie.css";

function Movie(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await Axios.get(`movie/${props.idMovie}?api_key=${API_KEY}&language=fr`);
        response.subscribe(movie => {
          if (movie.data)
            setMovie(movie.data);
          else
            setIsFound(false);
          setIsLoading(false);
        })
      } catch (error) {
        setIsError(true);
        console.log("Error has Occured while fetching movie with id:" + props.idMovie, error);
      }
    }
    fetchMovie();
  }, [])

  function getGenres(movie) {
    let result = "";
    movie.genres.forEach((element) => {
      result += element.name + ","
    });
    return result.slice(0, result.length - 1);
  }

  if (isLoading) return <LoadingDotsIcon />;
  if (isError) return <p>Veuillez réessayer</p>;
  if (!isFound) return <NotFound />;
  return (
    <div className="card">
      <div className="img1" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}></div>
      <div className="img2" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}></div>
      <div className="title">{movie.title}</div>
      <div className="text">{movie.overview.length === 0 && (
        <>
          Aucune description pour ce film
        </>
      )}
        {movie.overview.length > 0 && (
          <>
            {movie.overview.slice(0, 120)}...
          </>
        )}</div>
      <div className="catagory">{getGenres(movie)}<i className="fas fa-film"></i></div>
    </div>
  );
}
export default Movie;