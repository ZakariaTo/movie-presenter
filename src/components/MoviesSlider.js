import React, { useEffect, useState } from "react";
import Axios from "axios-observable";
import { API_KEY } from "../constants/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { concat, map, of } from 'rxjs';
import Movie from "../components/Movie"
import LoadingDotsIcon from "./LoadingDotsIcon";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../styles/swiper.css";

import { FreeMode, Pagination } from "swiper";

function MoviesSlider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let rest = props.offset % 20;
    let numberofPages = parseInt(props.offset / 20) + ((rest > 0 && rest <= 19) ? 1 : 0);
    function fetchMovies(currentPage, finalIndex) {
      return Axios.get(`movie/popular?api_key=${API_KEY}&language=fr&page=${currentPage}`)
        .pipe(
          map(movie => movie.data.results.splice(0, finalIndex))
        )
    }
    let temp = of([])
    for (let i = 1; i <= numberofPages; i++) {
      let lastIndex = (props.offset - (i * 20)) < 0 ? Math.abs(props.offset - (i * 20)) : 20;
      temp = concat(temp, fetchMovies(i, Math.abs(lastIndex)));
    }
    if (temp != null)
      temp.subscribe({
        next: (movie) => setMovies(prevState => ([...prevState, ...movie])),
        error: (err) => setIsError(true),
        complete: () => setIsLoading(false),
      })
  }, [])

  if (isLoading) return <LoadingDotsIcon/>
  if(isError) return <p>Veuillez réssayer</p>
  return (
    <>
      <h1>Lists des Films</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {
          movies && movies.length > 0 && movies.map(
            movie => { return <SwiperSlide><Movie idMovie={movie.id} /></SwiperSlide> }
          )
        }
      </Swiper>
    </>
  );
}

export default MoviesSlider;