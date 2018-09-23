export class User {
  public token: string;
  public username: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }
}
