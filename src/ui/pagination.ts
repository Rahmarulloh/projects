import { currentPage, movieLengthView, paginationBtnClick, tbody } from '../index';
import { createTableRow } from './tabledata';

const paginationContainer = document.querySelector('.pagination');

const pagination = (items: any[], rows_per_page: number) => {
  paginationContainer.innerHTML = '';
  if (items.length >= rows_per_page) {
    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
      const btn = paginationBTN(i, items);
      paginationContainer.appendChild(btn);
    }
  }
};

export const renderPaginationByGenre = (
  items: any[],
  wrapper: HTMLTableElement,
  rows_per_page: number,
  page: number,
  category: string
) => {
  const filteredMovies = items.filter(movie => movie.genre.name === category);
  console.log(filteredMovies);
  renderByPagination(filteredMovies, wrapper, rows_per_page, page);
  pagination(filteredMovies, rows_per_page);
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
  for (let i = 0; i < paginatedMovies.length; i++) {
    const movie = paginatedMovies[i];
    const movieGenreName = movie.genre.name;
    createTableRow(movie.title, movieGenreName, movie.numberInStock, movie.dailyRentalRate);
    console.log(items.length);
    movieLengthView.innerText = `Showing ${
      items.length === null ? 0 : items.length
    } movies in the table.`;
  }
};

function paginationBTN(page: number, items: any[]) {
  const li = document.createElement('li');
  li.className = 'page-item';
  const a = document.createElement('a');
  a.classList.add('page-link');
  a.innerHTML = `${page}`;
  li.appendChild(a);

  li.classList.remove('active');
  if (currentPage === page) li.classList.add('active');

  li.addEventListener('click', () => paginationBtnClick(li, page, items));

  return li;
}

export { pagination, renderByPagination };
