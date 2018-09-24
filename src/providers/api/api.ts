import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import * as camelcase from "camelcase-keys";
import * as snakecase from "snakecase-keys";

export class Api {

  protected baseOptions;
  protected url: string;
  protected excludedFields = ['created', 'modified', 'created_by', 'modified_by']

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

  // Make request
  protected request(type: string, path: string, data = null) {
    let url = this.getUrl(path);
    let options = this.baseOptions;
    if (data && typeof (data) == 'object') {
      data = snakecase(data);
      for (let f of this.excludedFields) {
        delete data[f];
      }
    }

    return Observable.create(observer => {
      this.storage.get('user').then(user => {
        if (user) {
          options.headers = options.headers.set('Authorization', 'JWT ' + user.token);
        }
        let http = this.http.get(url, options);
        switch (type) {
          case 'get': {
            http = this.http.get(url, options);
            break;
          }
          case 'post': {
            http = this.http.post(url, data, options);
            break;
          }
          case 'put': {
            http = this.http.put(url, data, options);
            break;
          }
          case 'patch': {
            http = this.http.patch(url, data, options);
            break;
          }
        }
        http.map(res => {
          return camelcase(res);
        }).subscribe(data => {
          observer.next(data);
          observer.complete();
        }, error => {
          if (error.error && typeof (error.error) == 'object') {
            observer.error(camelcase(error.error));
            observer.complete();
          }
          observer.error(camelcase(error));
          observer.complete();
        })
      });
    });
  }

  // Make POST request
  public requestPost(path: string, data) {
    return this.request('post', path, data);
  }

  // Make PATCH request
  public requestPatch(path: string, data) {
    return this.request('patch', path, data);
  }

  // Make PUT request
  public requestPut(path: string, data) {
    return this.request('put', path, data);
  }

  // Make GET request
  public requestGet(path: string) {
    return this.request('get', path);
  }
}
