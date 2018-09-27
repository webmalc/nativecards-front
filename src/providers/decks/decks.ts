import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Deck } from '../../models/deck';

@Injectable()
export class DecksProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch() {
    return this.requestGet('en/decks/');
  }

  public fetchEnabled() {
    return this.requestGet('en/decks/?is_enabled=true');
  }

  public get(id: number) {
    return this.requestGet(`en/decks/${id}/`);
  }

  public delete(deck: Deck) {
    return this.requestDelete(`en/decks/${deck.id}/`);
  }

  public save(deck: Deck) {
    delete deck.remoteImage;

    if (deck.id) {
      return this.requestPatch(`en/decks/${deck.id}/`, deck);
    } else {
      return this.requestPost(`en/decks/`, deck);
    }
  }
}
