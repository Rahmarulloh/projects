import "../public/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./projects/pay-me/typescript/index";
import { User } from "./projects/pay-me/typescript/entities";
import { UserRepository } from "./projects/pay-me/typescript/repository/user";

const firstName: HTMLInputElement = document.querySelector(".firstName");
const lastName: HTMLInputElement = document.querySelector(".lastName");
const phoneNumber: HTMLInputElement = document.querySelector(".phoneNumber");
const password: HTMLInputElement = document.querySelector(".password");
const addUser: HTMLButtonElement = document.querySelector(".addUser");
const tbody = document.querySelector("tbody");
const userRepository = new UserRepository();

function handleAddUser() {
  const user = new User(
    firstName.value,
    lastName.value,
    phoneNumber.value,
    password.value
  );

  userRepository.createUser(user);

  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.setAttribute("scope", "row");
  th.textContent = `${user.getId()}`;
  tr.appendChild(th);

  const tdFName = document.createElement("td");
  tdFName.textContent = `${user.firstName} ${user.lastName}`;
  tr.appendChild(tdFName);
  const tdPhNumber = document.createElement("td");
  tdPhNumber.textContent = `${user.phoneNumber}`;
  tr.appendChild(tdPhNumber);
  const tdDeleteBtn = document.createElement("td");
  const btnRemove = document.createElement("button") as HTMLButtonElement;
  btnRemove.className = "deleteUser btn btn-danger";
  btnRemove.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  tdDeleteBtn.appendChild(btnRemove);
  tr.appendChild(tdDeleteBtn);
  btnRemove.addEventListener("click", function removeEL(): void {
    tr.remove();
    return userRepository.deleteUser(user.getId(), user);
  });

  tbody.appendChild(tr);
}

addUser.addEventListener("click", handleAddUser);
