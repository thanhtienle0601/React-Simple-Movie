import { Fragment, useState } from "react";
import "./App.css";

import "swiper/scss";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/banner/Banner";

function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <Banner></Banner>
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
}

export default App;
