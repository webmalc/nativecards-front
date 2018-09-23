import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { elementAttribute } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs/Observable';

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

    if (token) {
      return Observable.create(observer => {
        this.storage.get('user').then(user => {
          options.headers = options.headers.set('Authorization', 'JWT ' + user.token);
          this.http.get(url, options).subscribe(data => {
            observer.next(data);
            observer.complete();
          }, error => {
            observer.error();
            observer.complete();
          });
        });
      });
    } else {
      return this.http.get(url, options);
    }
  }
}
