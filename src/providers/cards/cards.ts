import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Query } from '../../models/query';
// import { Deck } from '../../models/deck';
// import { Card } from '../../models/card';

@Injectable()
export class CardsProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch(query: Query) {
    let path = 'en/cards/';
    if (query.next) {
      path = this.getUrlPath(query.next);
    }
    if (query.deckId) {
      path = this.updateUrlParameter(path, 'deck', query.deckId);
    }
    if (query.word) {
      path = this.updateUrlParameter(path, 'search', query.word);
    }
    path = this.updateUrlParameter(path, 'ordering', 'word');

    return this.requestGet(path);
  }
}
