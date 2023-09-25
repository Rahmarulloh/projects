import './main.css';
import './search';
import { getGenres, getMovies } from './api';
import { createTableRow, createListItem } from './tabledata';
import { Auth } from './services';
import * as loginObject from './login';
import { pagination, renderByPagination } from './pagination';

export const tbody = document.querySelector('#tbody') as HTMLTableElement;
export const movieLengthView = document.querySelector('#movieLengthView') as HTMLSpanElement;
export const listTab = document.querySelector('#list-tab') as HTMLDivElement;
const listAllGenres = document.querySelector('#all') as HTMLAnchorElement;
const spinnerContainerTable = document.querySelector('#spinnerContainerTable') as HTMLDivElement;
const spinnerContainer = document.querySelector('#spinnerContainer') as HTMLDivElement;
const logo = document.querySelector('#logo') as HTMLAnchorElement;

export let currentPage = 3;
let rows = 5;

logo.onclick = () => {
  location.reload();
};

export const categoryArray: any[] = [];

async function moviesByGenre(category: string) {
  const movies = await getMovies();
  tbody.innerHTML = '';

  movies.forEach((movie: any) => {
    const movieGenreName = movie.genre.name;
    if (movieGenreName === category) {
      createTableRow(movie.title, movieGenreName, movie.numberInStock, movie.dailyRentalRate);
    }
    movieLengthView.innerText = `Showing ${tbody.children.length} movies in the table.`;
  });
}

export function paginationBtnClick(btn: HTMLLIElement, page: number, items: any[]) {
  currentPage = page;
  renderByPagination(items, tbody, rows, currentPage);

  const currentBtn = document.querySelector('.pagination li.active');
  currentBtn.classList.remove('active');

  btn.classList.add('active');
}

export async function init() {
  try {
    spinnerContainer.classList.add('d-none');
    spinnerContainerTable.classList.add('d-none');
    const [movies, genres] = await Promise.all([getMovies(), getGenres()]);

    for (let i = 0; i < movies.length; i += 4) {
      const movie = movies[i];
      const movieGenreName = movie.genre.name;
      createTableRow(movie.title, movieGenreName, movie.numberInStock, movie.dailyRentalRate);
      movieLengthView.innerText = `Showing ${tbody.children.length} movies in the table.`;
    }

    renderByPagination(movies, tbody, rows, currentPage);
    pagination(movies, rows);

    // renderByPagination(movies, tbody, rows, currentPage);

    genres.forEach((genre: any) => {
      const genreName = genre.name;
      createListItem(genreName);
    });

    categoryArray.forEach((categoryBtn: HTMLElement) => {
      categoryBtn.addEventListener('click', e => {
        const btn = e.target as HTMLButtonElement;
        const category = categoryBtn.id;
        moviesByGenre(category);

        listAllGenres.classList.remove('active');

        categoryArray.forEach(btn => btn.classList.remove('active'));

        btn.classList.add('active');
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

init();

listAllGenres.addEventListener('click', () => {
  listTab.innerHTML = ``;
  tbody.innerHTML = ``;
  window.location.reload();
});

// User Login And Local Storage Section Addition Start

loginObject.btnLogin.addEventListener('click', async () => {
  loginObject.mainContainerBody.innerHTML = ``;
  loginObject.createLoginForm();

  const loginBtn = document.querySelector('#login');
  const registerEmail = document.querySelector('#email') as HTMLInputElement;
  // hugo@gmail.com
  const registerPassword = document.querySelector('#password') as HTMLInputElement;
  // 27092004

  loginBtn.addEventListener('click', async () => {
    const token = await loginObject.login(registerEmail.value, registerPassword.value);
    const user = await Auth.Me(token);
    console.log('user = ', user);
    localStorage.clear();
    localStorage.setItem('username', `${user.name}`);

    const username = localStorage.getItem('username');

    console.log(username); // Output: hugo
    loginObject.btnLogin.innerText = ``;
    loginObject.btnLogin.className = `nav-link active`;
    loginObject.btnLogin.setAttribute('aria-current', 'page');
    loginObject.btnLogin.innerText = username;
    console.log(await init());
  });
});

if (localStorage.getItem('username') != ``) {
  loginObject.btnLogin.className = `nav-link active`;
  loginObject.btnLogin.setAttribute('aria-current', 'page');
  loginObject.btnLogin.style.cursor = 'pointer';
  loginObject.btnLogin.innerText = localStorage.getItem('username');
}

// User Login And Local Storage Section Addition Start
