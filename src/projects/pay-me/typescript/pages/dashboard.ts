import { Card, User } from "../entities";
import { CardService, UserService } from "../service";
import { cardsList, userList } from "./fakelist";

const dashboardHTML = `<div class="cards-table">
      <nav
        class="navbar bg-body-tertiary px-5 bg-light border border-bottom-3 border-primary"
        data-bs-theme="light"
      >
        <div class="container-fluid">
          <a class="navbar-brand fs-3" style="cursor: pointer">Uzgur</a>
          <div class="btns d-flex align-items-center">

            <h3 class="title me-2">Uzgur</h3>

            <div
              style="
                width: 50px;
                height: 50px;
                background: #fff;
                cursor: pointer;
              "
              class="d-flex justify-content-evenly align-items-center rounded-circle border border-primary fs-1 profile-pic"
            >
              U
            </div>
          </div>
        </div>
      </nav>

      <div class="container p-5">
	  	<nav class="navbar bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand">Filter</a>

				<div class="filters d-flex align-items-center gap-2">
					<div class="form">
						<select class="form-select" id="floatingSelect" aria-label="Floating label select example">
							<option selected>All</option>
						</select>
					</div>

					<form class="d-flex" role="search">
					<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
        <table class="table table-bordered border-primary">
          <thead class="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Owner</th>
              <th scope="col">Card Number</th>
              <th scope="col">Card type</th>
              <th scope="col">Bank name</th>
              <th scope="col">Expiry</th>
            </tr>
          </thead>
          <tbody id="tbody">
          </tbody>
        </table>
      </div>
    </div>`;

export const dashboard = (
  user: User,
  cardService: CardService,
  userService: UserService
) => {
  document.body.innerHTML = dashboardHTML;

  // const searchService = [...cardService.getCardNumber()]
  const leftSide = document.querySelector(".btns") as HTMLElement;
  const name = leftSide.querySelector(".title") as HTMLHeadingElement;
  const picture = leftSide.querySelector(".profile-pic") as HTMLDivElement;

  const formSelect = document.querySelector(".form-select") as HTMLFormElement;
  const tableBody = document.querySelector("#tbody") as HTMLTableElement;

  for (let i = 0; i < userService.getUserList().length; i++) {
    const option = document.createElement("option") as HTMLOptionElement;
    option.value = `${i + 1}`;
    option.innerText = userService.getUserList()[i].firstName;
    formSelect.appendChild(option);
  }

  for (let i = 0; i < userList.length; i++) {
    const user: string[] = userList[i];
    const cardList: Card = cardService.getList()[i];

    const tr = document.createElement("tr") as HTMLTableRowElement;
    const th = document.createElement("td") as HTMLTableHeaderCellElement;

    th.scope = "row";
    th.innerText = `${i + 1}`;
    const name = callDataToTd(user[0]);
    const cardNumber = callDataToTd(cardList.number);
    const cardTypeElm = callDataToTd(cardList.bankName);
    const bankNameElm = callDataToTd(cardList.cardType);
    const cardDate = callDataToTd(cardList.expiry);

    tr.appendChild(th);
    tr.appendChild(name);
    tr.appendChild(cardNumber);
    tr.appendChild(cardTypeElm);
    tr.appendChild(bankNameElm);
    tr.appendChild(cardDate);
    tableBody.appendChild(tr);
  }

  function callDataToTd(data: string) {
    const td = document.createElement("td") as HTMLTableDataCellElement;
    td.innerText = `${data}`;
    return td;
  }

  // function searchFunc(data:[]) {
  
    for (let i = 0; i < data.length; i++) {
      const user: string[] = userList[i];
      const cardList: Card = cardService.getList()[i];

      const tr = document.createElement("tr") as HTMLTableRowElement;
      const th = document.createElement("td") as HTMLTableHeaderCellElement;

      th.scope = "row";
      th.innerText = `${i + 1}`;

      const name = callDataToTd(user[0]);
      const cardNumber = callDataToTd(cardList.number);
      const cardTypeElm = callDataToTd(cardList.bankName);
      const bankNameElm = callDataToTd(cardList.cardType);
      const cardDate = callDataToTd(cardList.expiry);

      tr.appendChild(th);
      tr.appendChild(name);
      tr.appendChild(cardNumber);
      tr.appendChild(cardTypeElm);
      tr.appendChild(bankNameElm);
      tr.appendChild(cardDate);
      tableBody.appendChild(tr);
    }
  // }

  name.innerText = `${user.firstName + " " + user.lastName}`;
  picture.innerText = `${name.innerText.slice(0, 1)}`;
};
