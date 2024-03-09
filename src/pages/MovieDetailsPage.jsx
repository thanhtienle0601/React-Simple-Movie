import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    fetcher
  );
  if (!data) return null;
  console.log(data);
  return (
    <Fragment>
      <div className="w-full h-[650px] relative">
        <div className="overlay inset-0 bg-opacity-50 absolute bg-black"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
          }}
        ></div>
        <div className="max-w-[400px] h-[500px] mx-auto -mt-[450px] relative z-10 mb-10">
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt=""
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        <h1 className="text-white font-bold text-3xl text-center mb-10">
          {data.title}
        </h1>
        {data.genres.length > 0 && (
          <div className="flex items-center justify-center gap-x-10 mb-10">
            {data.genres.map((genre) => (
              <span
                key={genre.id}
                className="py-2 px-4 text-primary border border-primary rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
        <p className="max-w-[800px] text-center mx-auto leading-relaxed pb-10">
          {data.overview}
        </p>
        <MovieCredits></MovieCredits>
        <MovieVideos></MovieVideos>
        <MovieSimilar></MovieSimilar>
      </div>
    </Fragment>
  );

  function MovieCredits() {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits
    const { movieId } = useParams();
    const { data, error, isLoading } = useSWR(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      fetcher
    );
    if (!data) return null;
    console.log(data);
    return (
      <div>
        <h3 className="text-2xl font-semibold text-center mb-10">Cast</h3>
        <div className="grid grid-cols-4 gap-5 page-container pb-10">
          {data.cast.length > 0 &&
            data.cast.slice(0, 4).map((item) => (
              <div key={item.id} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                  alt=""
                  className="w-full h-[350px] object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl">{item.name}</h3>
              </div>
            ))}
        </div>
      </div>
    );
  }

  function MovieVideos() {
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/FSSsU-fOluY?si=7CHADYND947NQmQA"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>;
    const { movieId } = useParams();
    const { data, error, isLoading } = useSWR(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      fetcher
    );
    if (!data) return null;
    console.log(data);
    return (
      <div className="pb-10">
        <h3 className="text-2xl text-center font-bold pb-10">Videos</h3>
        <div className="flex flex-col gap-y-20 page-container">
          {data.results.length > 0 &&
            data.results.slice(0, 4).map((video) => (
              <div key={video.id}>
                <h4 className="pb-5">{video.name}</h4>
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}?si=YJQHB-2ADXLv9tVV`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  function MovieSimilar() {
    const { movieId } = useParams();
    const { data, error, isLoading } = useSWR(
      `https://api.themoviedb.org/3/movie/${movieId}/similar`,
      fetcher
    );
    if (!data) return null;
    console.log(data);
    return (
      <div className="movie-list page-container py-10">
        <h2 className="text-3xl font-bold pb-5">Similar Movies</h2>
        <Swiper spaceBetween={40} slidesPerView={"auto"} grabCursor={"true"}>
          {data.results?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};

export default MovieDetailsPage;
