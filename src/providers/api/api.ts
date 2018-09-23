import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

export class Api {

  protected baseOptions;
  protected url: string;

  public constructor(protected http: HttpClient, protected storage: Storage) {
    this.url = environment.api_url
    this.baseOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  // Get API URL
  public getUrl(path: string) {
    return this.url + path;
  }

  // Make POST request
  public requestPost(path: string, data, token: boolean = true) {
    let url = this.getUrl(path);
    let options = this.baseOptions;

    return this.http.post(url, data, options);
  }

  // Make GET request
  public requestGet(path: string, token: boolean = true) {
    let url = this.getUrl(path);
    let options = this.baseOptions;

    return this.http.get(url, options);
  }
}
