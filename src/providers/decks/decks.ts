import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class DecksProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch() {
    return this.requestGet('en/decks/');
  }
}
