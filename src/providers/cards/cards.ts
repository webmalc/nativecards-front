import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Query } from '../../models/query';
import { Card } from '../../models/card';

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
    if (query.category) {
      path = this.updateUrlParameter(path, 'category', query.category);
    }
    if (query.priority) {
      path = this.updateUrlParameter(path, 'priority', query.priority);
    }
    if (query.word) {
      path = this.updateUrlParameter(path, 'search', query.word);
    }
    path = this.updateUrlParameter(path, 'ordering', query.sortBy);

    return this.requestGet(path);
  }

  public get(id: number) {
    return this.requestGet(`en/cards/${id}/`);
  }

  public delete(card: Card) {
    return this.requestDelete(`en/decks/${card.id}/`);
  }

  public save(card: Card) {
    delete card.remoteImage;

    if (card.id) {
      return this.requestPatch(`en/decks/${card.id}/`, card);
    } else {
      return this.requestPost(`en/decks/`, card);
    }
  }

}
