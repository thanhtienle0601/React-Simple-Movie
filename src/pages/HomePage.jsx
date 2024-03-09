import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";
import Banner from "../components/banner/Banner";

const HomePage = () => {
  return (
    <Fragment>
      <Banner />
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white text-3xl font-bold my-10">
          Now Playing
        </h2>
        <MovieList></MovieList>
        <h2 className="capitalize text-white text-3xl font-bold my-10">
          Popular
        </h2>
        <MovieList type="popular"></MovieList>
        <h2 className="capitalize text-white text-3xl font-bold my-10">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
        <h2 className="capitalize text-white text-3xl font-bold my-10">
          Up Coming
        </h2>
        <MovieList type="upcoming"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
