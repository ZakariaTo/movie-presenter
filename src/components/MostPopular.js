import React, { useEffect, useState } from "react";
import Axios from 'axios-observable';
import { API_KEY } from '../constants/constants';
import Movie from "./Movie";
import LoadingDotsIcon from "./LoadingDotsIcon";

function MostPopular(props) {
  const PAGE_LIMIT = 20;
  const [isLoading, setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovies(offset) {
      try {
        if(offset > PAGE_LIMIT)
          offset = PAGE_LIMIT;
        const response = await Axios.get(`movie/popular?api_key=${API_KEY}&language=fr&page=1`);
        response.subscribe(movie => {
          setMovies(movie.data.results.splice(0, offset));
          setIsLoading(false);
        })
      } catch (e) {
        setIsError(true);
        console.log("Error Occured while fetching most popular movies");
      }
    }
    fetchMovies(props.offset);
  },[])
  if (isLoading) return <LoadingDotsIcon/>
  if(isError) return <p>Veuillez réssayer</p>
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