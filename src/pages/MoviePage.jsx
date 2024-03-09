import React, { Fragment } from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/popular`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <Fragment>
      <div className="py-10 page-container">
        <div className="flex mb-10">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type here to search..."
              className="w-full text-white p-4 bg-slate-800 outline-none"
            />
          </div>
          <button className="p-4 bg-primary text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MoviePage;
