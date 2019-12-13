export class User {
  public token: string;
  public refresh: string;
  public username: string;

  constructor(username: string, token: string, refresh: string) {
    this.username = username;
    this.token = token;
    this.refresh = refresh;
  }
}
