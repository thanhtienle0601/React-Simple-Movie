import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, { MovieCardSkeleton } from "@components/movie/MovieCard";
// import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { useDebounce } from "@uidotdev/usehooks";
import { v4 } from "uuid";
// https://api.themoviedb.org/3/search/movie
const MoviePage = () => {
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
  const { data, error, isLoading } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  const { total_pages, total_results } = data || [];
  console.log(total_pages);
  const itemsPerPage = Math.ceil(total_results / total_pages);
  console.log(itemsPerPage);
  const [pageCount, setPageCount] = useState(0);

  //paginate
  useEffect(() => {
    if (!total_pages) return;
    setPageCount(Math.ceil(total_results / itemsPerPage));
  }, [itemsPerPage, total_pages, total_results]);
  // if (!total_pages) return;
  // const pageCount = Math.ceil(total_pages / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total_results;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };

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
        {/* {loading && (
          <div className="lg:grid grid-cols-4 gap-10 sm:flex flex-col ">
            {new Array(itemsPerPage || 0).fill(0).map((item, index) => (
              <MovieCardSkeleton key={index}></MovieCardSkeleton>
            ))}
          </div>
        )} */}
        {!loading && (
          <div className="lg:grid grid-cols-4 gap-10 sm:flex flex-col ">
            {movies.length > 0 &&
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))}
          </div>
        )}
      </div>
      <div className="py-10 ">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginate"
        />
      </div>
    </Fragment>
  );
};

export default MoviePage;
