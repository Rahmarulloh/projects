import { currentPage, paginationBtnClick } from './index';
import { createTableRow } from './tabledata';

const paginationContainer = document.querySelector('.pagination');

const pagination = (items: any[], rows_per_page: number) => {
  paginationContainer.innerHTML = '';
  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    const btn = paginationBTN(i, items);
    paginationContainer.appendChild(btn);
  }
};

const renderByPagination = (
  items: any[],
  wrapper: HTMLTableElement,
  rows_per_page: number,
  page: number
) => {
  wrapper.innerHTML = '';
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedMovies = items.slice(start, end);
  console.log('paginatedMovies => ', paginatedMovies);
  for (let i = 0; i < paginatedMovies.length; i++) {
    const movie = paginatedMovies[i];
    console.log('movie => ', movie);
    const movieGenreName = movie.genre.name;
    createTableRow(movie.title, movieGenreName, movie.numberInStock, movie.dailyRentalRate);
  }
};

function paginationBTN(page: number, items: any[]) {
  const li = document.createElement('li');
  li.className = 'page-item';
  const a = document.createElement('a');
  a.classList.add('page-link');
  a.innerHTML = `${page}`;
  li.appendChild(a);

  if (currentPage === page) li.classList.add('active');

  li.addEventListener('click', () => paginationBtnClick(li, page, items));

  return li;
}

export { pagination, renderByPagination };
