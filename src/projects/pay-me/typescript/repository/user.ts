import { User } from "../entities";

export class UserRepository {
  private userList: User[] = [];
  private id: number = 1;

  createUser(user: User) {
    if (this.isExist(user.phoneNumber)) {
      throw new Error(`User ${user.phoneNumber} already exists`);
    }

    user.setId(this.id++);
    this.userList.push(user);
  }

  deleteUser(userId: number, user?: User) {
    const currentUser = this.getUserById(userId);
    this.userList.splice(this.userList.indexOf(currentUser), 1);
    user.setId((this.id = User.length));
  }

  getUserById(id: number) {
    const user = this.userList.find((user) => user.getId() === id);
    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    return user;
  }

  getUserByPhoneNumber(phoneNumber: string) {
    const user = this.userList.find((user) => user.phoneNumber === phoneNumber);
    if (!user) {
      throw new Error(`User's ${phoneNumber} does not exist`);
    }

    return user.getPhoneNumber();
  }

  getListOfUsers() {
    return this.userList;
  }

  private isExist(phoneNumber: string): boolean {
    return !!this.userList.find((user) => user.phoneNumber === phoneNumber);
  }
}
