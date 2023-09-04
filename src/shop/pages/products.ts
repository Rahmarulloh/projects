import { User } from "../entities/user";
import { newProduct, newUser } from "../repository";
import { registerLogin } from "./registerLogin";

const productHTML = `
    <nav class="navbar bg-body-tertiary py-3">
      <div class="container-fluid">
        <a class="navbar-brand">SHOP | UZGUR</a>
        <div class="d-flex gap-3">
          <button
            type="button"
            class="btn btn-outline-primary position-relative d-none"
            id="basket"
          >
            <i class="bi bi-cart4"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger visually-hidden" id="badge"
            >
              99+
            </span>
          </button>
          <button class="btn btn-outline-primary" id="logIn">Log in</button>
        </div>
      </div>
    </nav> 

    <div class="container mt-5">
      <nav class="navbar w-50 bg-body-tertiary rounded">
        <div class="container-fluid">
          <form class="d-flex w-100" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              id="search"
              autocomplete="off"
            />
            <select class="form-select" id="select">
              <option selected value="all">All</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </form>
        </div>
      </nav>
      
      <div class="row row-cols-1 row-cols-md-4 g-4 my-3" id="cards"></div>
    </div>
`;

const createCardHTML = (title: string, thumbnail: string, price: string) => `
  <div class="col">
    <div class="card h-100">
      <div class="card-img-top card__img" style="background: url('${thumbnail}') no-repeat center center / cover;"></div>
      <div class="card-body" id="card__body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">$${price}</p>
        <button class="btn btn-primary card__btn">Add to basket</button>
      </div>
    </div>
  </div>
`;

export const products = async () => {
  document.body.innerHTML = productHTML;

  const container = document.querySelector("#cards") as HTMLDivElement;
  const badge = document.querySelector("#badge") as HTMLSpanElement;
  const searchElm = document.querySelector("#search") as HTMLInputElement;
  const selectElm = document.querySelector("#select") as HTMLSelectElement;
  let counter = 0;

  try {
    const response = await fetch("https://dummyjson.com/products?limit=120");
    const json = await response.json();

    console.log(json);

    for (const product of json.products) {
      container.innerHTML += createCardHTML(
        product.title,
        product.thumbnail,
        product.price
      );

      newProduct.create(
        product.title,
        product.description,
        product.thumbnail,
        product.price
      );
    }

    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      const products = newProduct.search(searchElm.value);
      container.innerHTML = "";
      for (const product of products) {
        container.innerHTML += createCardHTML(
          product.title,
          product.thumbnail,
          product.price
        );
      }
      console.log(products);
    });

    selectElm.addEventListener("change", (e) => {
      e.preventDefault();
      const products = newProduct.sort(selectElm.value);
      container.innerHTML = "";
      for (const product of products) {
        container.innerHTML += createCardHTML(
          product.title,
          product.thumbnail,
          product.price
        );
      }
      console.log(products);
    });

    console.log(newProduct.getList());

    container.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;

      if (
        target.classList.contains("card__btn") &&
        newUser.getUserList().length > 0
      ) {
        target.disabled = true;

        counter++;

        console.log(counter);

        badge.innerText = `${counter > 50 ? "50+" : counter}`;
        badge.classList.remove("visually-hidden");
        target.textContent = "In cart";
        target.className = "btn btn-outline-primary card__btn";
      } else if (target.classList.contains("card__btn")) {
        registerLogin();
      }
    });

    const logInBtn = document.querySelector("#logIn") as HTMLButtonElement;
    const basket = document.querySelector("#basket") as HTMLButtonElement;
    if (newUser.userList.length === 0) {
      logInBtn.addEventListener("click", () => {
        registerLogin();
      });
    } else {
      logInBtn.textContent = `Log out (${newUser.userList[0].firstName})`;
      logInBtn.className = "btn btn-outline-danger";
      basket.classList.remove("d-none");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

products();
