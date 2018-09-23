export class User {
  public token: string;
  public login: string;

  constructor(login: string, token: string) {
    this.login = login;
    this.token = token;
  }
}
