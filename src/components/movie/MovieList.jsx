/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}`,
    fetcher
  );
  useEffect(() => {
    setMovies(data?.results);
  }, [data]);

  return (
    <div className="movie-list">
      <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={"true"}>
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
