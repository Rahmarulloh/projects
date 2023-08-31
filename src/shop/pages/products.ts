import { Products } from "../entities/index";
import { ProductRepository } from "../repository/product";
import { registerLogin } from "./registerLogin";

const productHTML = `
    <nav class="navbar bg-body-tertiary py-3">
      <div class="container-fluid">
        <a class="navbar-brand">SHOP | UZGUR</a>
        <div class="d-flex gap-3">
          <button
            type="button"
            class="btn btn-outline-primary position-relative d-none"
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
      <div class="row row-cols-1 row-cols-md-4 g-4" id="cards"></div>
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
  let counter = 0;

  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const json = await response.json();

    console.log(json);

    for (const product of json.products) {
      container.innerHTML += createCardHTML(
        product.title,
        product.thumbnail,
        product.price
      );
    }

    container.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;

      if (target.classList.contains("card__btn")) {
        target.disabled = true;

        counter++;

        console.log(counter);

        badge.innerText = `${counter > 50 ? "50+" : counter}`;
        badge.classList.remove("visually-hidden");
      }
    });

    const singUpButton = document.querySelector("#logIn") as HTMLButtonElement;
    singUpButton.addEventListener("click", () => {
      registerLogin();
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

products();
