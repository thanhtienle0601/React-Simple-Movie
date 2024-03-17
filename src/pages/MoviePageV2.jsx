import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, { MovieCardSkeleton } from "@components/movie/MovieCard";
// import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { useDebounce } from "@uidotdev/usehooks";
import { v4 } from "uuid";
import Button from "@components/button/Button";
import useSWRInfinite from "swr/infinite";
// https://api.themoviedb.org/3/search/movie
const MoviePageV2 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);

  const [url, setUrl] = useState(tmdbAPI.getListMovies("popular"));
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const filterDebounce = useDebounce(filter, 2000);
  const debouncedSearchTerm = useDebounce(filter, 2000);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setUrl(tmdbAPI.getSearchListMovies(debouncedSearchTerm, currentPage));
    } else {
      setUrl(tmdbAPI.getListMovies("popular", currentPage));
    }
  }, [currentPage, debouncedSearchTerm]);
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index) => url.replace("page=1", `page=${index + 1}`),
      fetcher
    );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const { total_pages, total_results } = data || [];
  const itemsPerPage = Math.ceil(total_results / total_pages);
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.results.length < itemsPerPage) ||
    20;
  console.log(isReachingEnd);
  const loading = !data;

  return (
    <Fragment>
      <div className="py-10 page-container">
        <div className="flex mb-10">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type here to search..."
              className="w-full text-white p-4 bg-slate-800 outline-none"
              onChange={handleFilterChange}
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
        {loading && (
          <div className="lg:grid grid-cols-4 gap-10 sm:flex flex-col ">
            {new Array(itemsPerPage || 20).fill(0).map(() => (
              <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
            ))}
          </div>
        )}

        {!loading && (
          <div className="lg:grid grid-cols-4 gap-10 sm:flex flex-col ">
            {movies.length > 0 &&
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))}
          </div>
        )}
      </div>
      <div className="my-10 text-center">
        <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-400" : ""}`}
        >
          Load More
        </Button>
      </div>
    </Fragment>
  );
};

export default MoviePageV2;
