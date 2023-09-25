// import { createTableRow } from './tabledata';

// const paginationContainer = document.querySelector('.pagination');

// const pagination = (items: any[], rows_per_page: number) => {
//   paginationContainer.innerHTML = '';
//   const pageItem = `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`;
//   paginationContainer.innerHTML += pageItem;
// };

// const renderByPagination = (
//   items: any[],
//   wrapper: HTMLTableElement,
//   rows_per_page: number,
//   page: number
// ) => {
//   wrapper.innerHTML = '';
//   page--;

//   let start = rows_per_page * page;
//   let end = start + rows_per_page;
//   let paginatedMovies = items.slice(start, end);
//   console.log('paginatedMovies => ', paginatedMovies);
//   for (let i = 0; i < paginatedMovies.length; i++) {
//     const movie = paginatedMovies[i];
//     console.log('movie => ', movie);
//     const movieGenreName = movie.genre.name;
//     createTableRow(movie.title, movieGenreName, movie.numberInStock, movie.dailyRentalRate);
//   }
// };

// export { pagination, renderByPagination };
