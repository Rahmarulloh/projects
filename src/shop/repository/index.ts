import { ProductRepository } from "./product";
import { UserRepository } from "./user";

const newUser = new UserRepository();
const newProduct = new ProductRepository();

export { newUser, newProduct };
