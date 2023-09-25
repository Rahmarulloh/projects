async function getMovies() {
  const baseURL = 'http://localhost:4000/api';

  const res = await fetch(baseURL + '/movies');
  const movies = await res.json();

  return movies;
}

async function getGenres() {
  const baseURL = 'http://localhost:4000/api';

  const res = await fetch(baseURL + '/genres');
  const genres = await res.json();

  return genres;
}

export { getMovies, getGenres };
