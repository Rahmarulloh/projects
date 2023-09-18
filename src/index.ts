import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../public/style.css";
import { getCategories, getProducts } from "./async-await";

getProducts();
getCategories();
