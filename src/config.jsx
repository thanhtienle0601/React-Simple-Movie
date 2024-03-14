export const fetcher = (...args) =>
  fetch(...args, options).then((res) => res.json());

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTk1YjBmYzFhNDEwOThlOTVhMTFmNzliZDk0Y2E3OCIsInN1YiI6IjYzODU4ZDhlYmYwOWQxMDBkNzBjZmM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ctcqipwBUQoFuABS9vh3Z-EIOKeAM1lrsAUjcFkqc_I",
  },
};

const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
const tmdbSearchEndPoint = "https://api.themoviedb.org/3/search/movie";
const tmdbImageEndPoint = "https://image.tmdb.org/t/p/original";
const tmdbVideoEndPoint = "https://www.youtube.com/embed/";

export const tmdbAPI = {
  getListMovies: (type, page = 1) => `${tmdbEndPoint}/${type}?page=${page}`,
  getSearchListMovies: (query, page) =>
    `${tmdbSearchEndPoint}?query=${query}&page=${page}`,
  getDetailsMovie: (movieId, type) => `${tmdbEndPoint}/${movieId}${type}`,
  getImageURL: (url) => `${tmdbImageEndPoint}/${url}`,
  getVideoURL: (key) => `${tmdbVideoEndPoint}/${key}`,
};
