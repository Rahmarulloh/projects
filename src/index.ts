import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const API_KEY = "wq9r95XYG3UuEQrbwJZvHNHWRq68dnFC4Up9Qn8zLP4";
const URL = "https://api.unsplash.com/photos/random?count=10&client_id=";
const containerImages = document.querySelector(".container-images");
const moreBtn = document.querySelector(".more-btn") as HTMLButtonElement;
const refreshBtn = document.querySelector(".refresh-btn") as HTMLButtonElement;
const img = (link: string) =>
  `<img src=${link} class="img-thumbnail w-50" alt="image" />`;

const images = async () => {
  try {
    moreBtn.disabled = true;
    refreshBtn.disabled = true;
    const response = await fetch(URL + API_KEY);
    const data = await response.json();
    const urls = data.map(
      (item: { urls: { regular: any } }) => item.urls.regular
    );
    return urls;
  } catch (err) {
    console.error(err.message);
    const imgError = document.createElement("img");
    imgError.src =
      "https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-3959253-3299952.gif";
    containerImages.innerHTML = `${imgError}`;
    return [];
  }
};

const render = async (typeBtn: string) => {
  const urls = await images();
  console.log(urls);
  const imageHTML = urls.map((url: string) => img(url)).join("");
  if (typeBtn === "refresh") {
    containerImages.innerHTML = imageHTML;
  } else {
    containerImages.innerHTML += imageHTML;
  }
  const imgElm = containerImages.querySelector(
    ".img-thumbnail"
  ) as HTMLImageElement;
  imgElm.onload = () => {
    moreBtn.disabled = false;
    refreshBtn.disabled = false;
    console.log("Image loaded");
  };
};

refreshBtn.addEventListener("click", () => {
  render("refresh");
});

moreBtn.addEventListener("click", async () => {
  render("more");
});

render("load");
