import {
  renderCategory,
  select,
  renderProduct,
  productContainer,
  renderPrice,
  price_input,
} from "../render";

const categoryURL = "https://dummyjson.com/products";
const category = "categories";

const productURL = "https://dummyjson.com";
const productsURL = "products";

const limit = "limit=15";

const products = [];

const amount = document.querySelector("#amount") as HTMLSpanElement;
const selectElm = document.querySelector("#sort_by") as HTMLSelectElement;
const search_input = document.querySelector(".searchInput") as HTMLInputElement;
const reset_filter_btn = document.querySelector(
  ".resetFilter"
) as HTMLButtonElement;
reset_filter_btn.disabled = true;

export const getCategories = async () => {
  const data = await fetch(`${categoryURL}/${category}`);
  const categories = await data.json();

  let options = "";
  for (const category of categories) {
    const option = renderCategory(category);
    options += `${option}`;
  }

  select.innerHTML += options;

  const optionsElm = document.querySelectorAll(".option");
  optionsElm.forEach((option) => {
    const categoryID = option.getAttribute("id");

    option.addEventListener("click", () => {
      if (categoryID === "all") getProducts();
      else getProduct(categoryID);
      reset_filter_btn.disabled = false;
    });
  });
};

export const getProducts = async () => {
  const response = await fetch(`${productURL}/${productsURL}?${limit}`);
  const data = await response.json();
  const products = data.products;
  const maxPrice = products.reduce(
    (acc: number, cur: { price: number }) => Math.max(acc, cur.price),
    0
  );
  amount.innerText = products.length;
  price_input.value = maxPrice;
  renderPrice(maxPrice);

  let cards = "";
  for (const product of products) {
    const card = renderProduct(product.thumbnail, product.title, product.price);
    cards += `${card}`;
  }

  productContainer.innerHTML = cards;
};

export const getProduct = async (categoryID: any) => {
  const data = await fetch(`${categoryURL}/category/${categoryID}`);
  const categories = await data.json();
  const products = categories.products;
  amount.innerText = products.length;
  console.log(categories.products);

  let cards = "";
  for (const product of products) {
    const card = renderProduct(product.thumbnail, product.title, product.price);
    cards += `${card}`;
  }

  productContainer.innerHTML = cards;
};

const filterProductsByPriceRange = (
  products: any,
  minPrice: string,
  maxPrice: string
) => {
  return products
    .filter((product: { price: string }) => {
      const productPrice = product.price;
      return productPrice >= minPrice && productPrice <= maxPrice;
    })
    .sort((a: { price: number }, b: { price: number }) => b.price - a.price);
};

const fetchData = async (url: string) => {
  const response = await fetch(`${url}?${limit}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return data.products;
};

const searchData = async (url: string, value: string) => {
  const response = await fetch(`${url}/search?q=${value}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return data.products;
};

const getFilteredProducts = async (maxValue: string) => {
  const productsData = await fetchData(categoryURL);
  const minPrice = `${0}`;
  const maxPrice = `${maxValue}`;
  console.log(price_input.value);
  console.log("maxPrice = " + maxPrice);
  const products = filterProductsByPriceRange(productsData, minPrice, maxPrice);
  amount.innerText = products.length;
  console.log(
    "product = ",
    filterProductsByPriceRange(productsData, minPrice, maxPrice)
  );
  renderPrice(maxValue);

  let cards = "";
  for (const product of products) {
    const card = renderProduct(product.thumbnail, product.title, product.price);
    cards += `${card}`;
  }

  productContainer.innerHTML = cards;
};

price_input.addEventListener("change", (e) => {
  const maxValue = price_input.value;
  console.log(price_input.value);
  getFilteredProducts(maxValue);
  reset_filter_btn.disabled = false;
});

const searchResult = async (searchValue: string) => {
  const result = await searchData(categoryURL, searchValue);
  console.log(result);
  return result;
};

search_input.addEventListener("keyup", async (e) => {
  const search_value = search_input.value;
  const products = await searchResult(search_value);
  amount.innerText = products.length;
  reset_filter_btn.disabled = false;

  let cards = "";
  for (const product of products) {
    const card = renderProduct(product.thumbnail, product.title, product.price);
    cards += `${card}`;
  }

  productContainer.innerHTML = cards;
});

reset_filter_btn.addEventListener("click", () => {
  getProducts();
  renderPrice("0");
  search_input.value = "";
  reset_filter_btn.disabled = true;
  price_input.value = "0";
});

selectElm.addEventListener("change", async () => {
  const select_value = selectElm.value;

  const productsData = await fetchData(categoryURL);
  const highestPrice = [...productsData].sort(
    (a: { price: number }, b: { price: number }) => b.price - a.price
  );
  const lowestPrice = [...productsData].sort(
    (a: { price: number }, b: { price: number }) => a.price - b.price
  );
  const a_z = [...productsData].sort(
    (a: { title: string }, b: { title: string }) => {
      const titleA = a.title.slice(0, 1).toLowerCase();
      const titleB = b.title.slice(0, 1).toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    }
  );
  const z_a = [...productsData].sort(
    (a: { title: string }, b: { title: string }) =>
      a.title.slice(0, 1).toLowerCase() > b.title.slice(0, 1).toLowerCase()
        ? -1
        : 1
  );

  if (select_value === "all") getProducts();

  if (select_value === "lowest") {
    let cards = "";
    for (const product of lowestPrice) {
      const card = renderProduct(
        product.thumbnail,
        product.title,
        product.price
      );
      cards += `${card}`;
    }

    productContainer.innerHTML = cards;
  }

  if (select_value === "highest") {
    let cards = "";
    for (const product of highestPrice) {
      const card = renderProduct(
        product.thumbnail,
        product.title,
        product.price
      );
      cards += `${card}`;
    }

    productContainer.innerHTML = cards;

    console.log(select_value);
  }

  if (select_value === "a_z") {
    let cards = "";
    for (const product of a_z) {
      const card = renderProduct(
        product.thumbnail,
        product.title,
        product.price
      );
      cards += `${card}`;
    }

    productContainer.innerHTML = cards;

    console.log(select_value);
  }

  if (select_value === "z_a") {
    let cards = "";
    for (const product of z_a) {
      const card = renderProduct(
        product.thumbnail,
        product.title,
        product.price
      );
      cards += `${card}`;
    }

    productContainer.innerHTML = cards;

    console.log(select_value);
  }
});
