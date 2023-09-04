import { faker } from "@faker-js/faker";
import { Products } from "../entities/products";

export class ProductRepository {
  private productList: Array<Products> = [];

  create(title: string, description: string, image: string, price: string) {
    const product = new Products(
      faker.string.uuid(),
      title,
      description,
      image,
      price
    );

    this.productList.push(product);
  }

  getList() {
    return this.productList;
  }

  search(productTitle = ""): Products[] {
    const products: Products[] = this.getList();

    if (!productTitle) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(productTitle.toLowerCase())
    );
  }

  sort(productPrice = ""): Products[] {
    const products: Products[] = this.getList();

    if (!productPrice) return products;

    if (productPrice === "ascending") {
      return [...products].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (productPrice === "descending") {
      return [...products].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (productPrice === "all") {
      return [...products];
    }
  }
}
