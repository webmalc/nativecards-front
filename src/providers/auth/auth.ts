import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';
import { User } from '../../models/user'

@Injectable()
export class AuthProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  // Login user
  public login(credentials) {
    return Observable.create(observer => {
      this.requestPost('api-token-auth/', credentials, false).subscribe(data => {
        if (data && data['token']) {
          let user = new User(credentials.username, data['token']);
          this.storage.set('user', user).then((user) => {
            observer.next(user);
            observer.complete();
          });
        } else {
          observer.next(false);
          observer.complete();
        }
      }, error => {
        observer.next(false);
        observer.complete();
      })
    });
  }

  // Get user from storage
  public getUserInfo() {
    return this.storage.get('user');
  }

  // Refresh user token
  public refreshToken() {
    return Observable.create(observer => {
      this.getUserInfo().then((oldUser) => {
        if (oldUser) {
          let tokenData = { 'token': oldUser.token };
          this.requestPost('api-token-refresh/', tokenData, false).subscribe(data => {
            if (data && data['token']) {
              let user = new User(oldUser.username, data['token']);
              this.storage.set('user', user).then((user) => {
                observer.next(user);
                observer.complete();
              });
            } else {
              observer.error();
              observer.complete();
            }
          }, error => {
            observer.error();
            observer.complete();
          })
        } else {
          observer.error();
          observer.complete();
        }
      });
    });
  }

  // Logout user
  public logout() {
    return this.storage.remove('user')
  }
}
