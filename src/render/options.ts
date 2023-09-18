export const select = document.querySelector(".category");

export const renderCategory = (category: string) =>
  `<p id="${category}" class="option">${category}</p>`;
