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
}
