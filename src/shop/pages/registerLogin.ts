import { UserRepository } from "../repository/user";
import { products } from "./products";

const createForm = (formName: string, navigate: string) =>
  `<div class="container">
      <div
        style="height: 100vh"
        class="container d-flex justify-content-center align-items-center"
      >
        <form class="w-50" id="form">
          <h2>${formName} Form</h2>
          <div class="mb-3">
            <label for="name" class="form-label">User name:</label>
            <input
              type="tel"
              placeholder="Enter user name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              class="form-control"
              id="password"
              required
            />
          </div>
          <div
            style="cursor: pointer"
            class="mb-3 text-secondary"
            id="navigate-register"
          >
            ${navigate}
          </div>
        </form>
      </div>
    </div>`;

export const registerLogin = () => {
  let formName: string = "Log in";

  const newUser = new UserRepository();

  const navigator = "Do you have an account ?";
  document.body.innerHTML = createForm(formName, navigator);

  const form = document.getElementById("form");
  const btn = document.createElement("button") as HTMLButtonElement;
  btn.className = "btn btn-primary";
  btn.innerText = formName;
  form.appendChild(btn);

  const name = form.querySelector("#name") as HTMLInputElement;
  const password = form.querySelector("#password") as HTMLInputElement;

  btn.onclick = (e) => {
    e.preventDefault();
    products();
    newUser.create(name.value, password.value);
  };
};
