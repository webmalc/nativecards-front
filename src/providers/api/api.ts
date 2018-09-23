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

  // Make request
  protected request(type: string, path: string, data = null) {
    let url = this.getUrl(path);
    let options = this.baseOptions;

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
        http.subscribe(data => {
          observer.next(data);
          observer.complete();
        }, error => {
          observer.error();
          observer.complete();
        });
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
