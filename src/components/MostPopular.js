import React, { useEffect, useState } from "react";
import Axios from 'axios-observable';
import { API_KEY } from '../constants/constants';
import Movie from "./Movie";
import LoadingDotsIcon from "./LoadingDotsIcon";

function MostPopular(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovies(offset) {
      try {
        const response = await Axios.get(`movie/popular?api_key=${API_KEY}&language=fr&page=1`);
        response.subscribe(movie => {
          console.log(movie.data.results.splice(0, offset))
          setMovies(movie.data.results.splice(0, offset));
          setIsLoading(false);
        })
      } catch (e) {
        console.log("Error Occured while fetching most popular movies");
      }
    }
    fetchMovies(props.offset);
  }, [])
  if (isLoading) return <LoadingDotsIcon/>
  return (
    <div class="container">
      <h1>Films Les plus Populaires</h1>
      <div class="row">
        {
          movies && movies.length > 0 && movies.map(
            movie => { return <div class="col-sm"><Movie idMovie={movie.id} /></div> }
          )
        }
      </div>
    </div>
  );
}
export default MostPopular;