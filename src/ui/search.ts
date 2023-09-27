import '../index';
import { tbody } from '../index';

const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
searchInput.addEventListener('input', (e: any) => {
  const searchValue = e.target.value;
  console.log(searchValue);
  doSearch(searchValue);
});

function doSearch(searchValue: string) {
  console.log(searchValue);
  Array.from(tbody.children).forEach((rowElement: HTMLTableRowElement, index: number) => {
    if (!rowElement.id.toLowerCase().includes(searchValue.toLowerCase())) {
      rowElement.style.display = 'none';
    } else {
      rowElement.style.display = '';
    }
  });
}
