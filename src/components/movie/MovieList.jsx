/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error, isLoading } = useSWR(
    tmdbAPI.getListMovies(type),
    fetcher
  );
  useEffect(() => {
    setMovies(data?.results);
  }, [data]);

  return (
    <div className="movie-list">
      {isLoading && (
        <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={"true"}>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
            <MovieCardSkeleton></MovieCardSkeleton>
            <MovieCardSkeleton></MovieCardSkeleton>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        </Swiper>
      )}
      {!isLoading && (
        <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={"true"}>
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
