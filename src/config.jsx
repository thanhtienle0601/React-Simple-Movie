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
