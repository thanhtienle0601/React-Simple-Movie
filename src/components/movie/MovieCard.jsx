/* eslint-disable react/prop-types */
import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card flex flex-col rounded-lg bg-slate-800 text-white p-3 h-full select-none">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>{movie.vote_average}</span>
        </div>
        <button className="py-3 px-6 rounded-lg bg-primary capitalize w-full mt-auto">
          watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
