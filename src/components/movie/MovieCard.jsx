/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/button/Button";
import { tmdbAPI } from "../../config";
import LoadingSkeleton from "@components/loading/LoadingSkeleton";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg bg-slate-800 text-white p-3 h-full select-none">
      <img
        src={`${tmdbAPI.getImageURL(movie.poster_path)}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>{movie.vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${movie.id}`)}>
          Watch Now
        </Button>
        {/* <button
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="py-3 px-6 rounded-lg bg-primary capitalize mt-auto"
        >
          watch now
        </button> */}
      </div>
    </div>
  );
};

export default MovieCard;

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg bg-slate-800 text-white p-3 h-full select-none">
      <LoadingSkeleton className="w-full h-[250px] rounded-lg mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <LoadingSkeleton className="w-full h-[10px] mb-3"></LoadingSkeleton>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton className="w-[50px] h-[5px]"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-[50px] h-[5px]"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton className="w-full h-[50px] rounded-lg"></LoadingSkeleton>
      </div>
    </div>
  );
};
