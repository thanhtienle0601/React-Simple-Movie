/* eslint-disable react/prop-types */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";

const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/now_playing`,
    fetcher
  );

  const movies = data?.results || [];
  console.log(movies);
  return (
    <section className="banner h-[650px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"} className="h-full">
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerItem movie={movie}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ movie }) {
  const genres = new Array(movie.genre_ids);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list`,
    fetcher
  );
  const genresList = data?.genres || [];

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 rounded-lg bg-gradient-to-t from-black to-[rgba(0,0,0,0.5)] opacity-80"></div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 text-white w-full">
        <h2 className="font-bold text-3xl mb-5">{movie.title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genres[0].length > 0 &&
            genres[0].map((genre) => (
              <span
                key={genre}
                className="py-2 px-4 rounded-md border border-white"
              >
                {genresList.map((genreItem) => {
                  if (genre === genreItem.id) {
                    return genreItem.name;
                  }
                })}
              </span>
            ))}
        </div>
        <button className="py-3 px-6 bg-primary rounded-lg text-white font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
