import { User } from "./entities";
import { Card } from "./entities/card";
import { CardRepository } from "./repository";
import { UserRepository } from "./repository/user";

// const cardRepository = new CardRepository();

// const card1 = new Card(
//   "8600 1345 3333 4444",
//   "0000",
//   "05/26",
//   "UZCARD",
//   0,
//   "123123",
//   "TBC"
// );

// const card2 = new Card(
//   "8600 1345 3333 4445",
//   "0000",
//   "05/26",
//   "UZCARD",
//   0,
//   "123124",
//   "TBC"
// );

// cardRepository.create(card1);
// cardRepository.create(card2);

// cardRepository.delete(card1.getId());

// const cards = cardRepository.getList();
// console.log(cards);

// const userRepository = new UserRepository();

// const user1 = new User("John", "Smith", "12457", "123123");
// const user2 = new User("John", "Kent", "74512", "123123");

// userRepository.createUser(user1);
// userRepository.createUser(user2);

// console.log(user1.getId());

// userRepository.deleteUser(user1.getId());

// const users = userRepository.getUserByPhoneNumber(user2.getPhoneNumb///er());

// console.log(users);
