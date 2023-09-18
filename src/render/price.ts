const price_num = document.querySelector(".price_filter_num");
const price_input = document.querySelector(
  "#priceRangeInput"
) as HTMLInputElement;

const renderPrice = (value: string = "0") => {
  price_num.textContent = value;
};

export { renderPrice, price_input };
