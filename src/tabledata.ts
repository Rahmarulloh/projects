import { tbody, listTab, categoryArray } from './index';

export function createTableRow(
  movieTitle: string,
  movieGenreName: string,
  movieNumberInStock: number,
  dailyRentalRate: number
): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.id = movieTitle;

  const th = document.createElement('th');
  th.className = 'movieNameContainer text-info fw-medium';
  th.textContent = movieTitle;
  tr.appendChild(th);

  const td1 = document.createElement('td');
  td1.className = 'genreContainerCell';
  td1.textContent = movieGenreName;
  tr.appendChild(td1);

  const td2 = document.createElement('td');
  td2.className = 'stockContainerCell';
  td2.textContent = `${movieNumberInStock}`;
  tr.appendChild(td2);

  const td3 = document.createElement('td');
  td3.className = 'rateContainerCell';
  td3.textContent = `${dailyRentalRate}`;
  tr.appendChild(td3);

  const td4 = document.createElement('td');
  td4.className = 'iconContainerCell';
  const heartIcon = document.createElement('i');
  heartIcon.className = 'fa-regular fa-heart';
  td4.appendChild(heartIcon);
  tr.appendChild(td4);
  tbody.appendChild(tr);

  return tr;
}

export function createListItem(nameGenre: string) {
  const aTag: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  aTag.classList.add('list-group-item', 'list-group-item-action');
  aTag.style.cursor = 'pointer';
  aTag.innerText = nameGenre;
  aTag.id = nameGenre;
  listTab.appendChild(aTag);
  categoryArray.push(aTag);
  return aTag;
}
