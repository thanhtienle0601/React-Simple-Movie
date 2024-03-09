import "./App.css";
import "swiper/scss";

import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/movies" element={<MoviePage />}></Route>
        <Route path="/movie/:movieId" element={<MovieDetailsPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
