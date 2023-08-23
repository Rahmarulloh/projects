export class User {
  private id: number;
  private isBlocked: boolean;
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    private password: string
  ) {}

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getBlocked(): boolean {
    return this.isBlocked;
  }

  setBlocked(block: boolean) {
    this.isBlocked = block;
  }

  setId(id: number) {
    return (this.id = id);
  }

  getId() {
    return this.id;
  }
}
