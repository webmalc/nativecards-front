import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Query } from '../../models/query';
import { Card } from '../../models/card';
import { plainToClass } from "class-transformer";

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
    if (query.complete == 'completed') {
      path = this.updateUrlParameter(path, 'complete__gte', 100);
    }
    if (query.complete == 'in_process') {
      path = this.updateUrlParameter(path, 'complete__lte', 99);
      path = this.updateUrlParameter(path, 'complete__gte', 1);
    }
    if (query.complete == 'not_practiced') {
      path = this.updateUrlParameter(path, 'complete__lte', 0);
    }
    path = this.updateUrlParameter(path, 'ordering', query.sortBy);

    return this.requestGet(path);
  }

  public attemptSave(card: Card) {
    return this.requestPost(`en/attempts/`, {
      'card': card.id,
      'form': card.form,
      'is_correct': card.isCorrect,
      'is_hint': card.attempts > 0 ? true : false,
      'answer': card.answer,
    });
  }

  public lessons(query: Query) {
    let path = 'en/cards/lesson/';
    if (query.deckId) {
      path = this.updateUrlParameter(path, 'deck', query.deckId);
    }
    if (query.category) {
      path = this.updateUrlParameter(path, 'category', query.category);
    }
    if (query.isLatest) {
      path = this.updateUrlParameter(path, 'is_latest', 1);
    }

    return this.requestGet(path).map(res => {
      let cards = plainToClass(Card, res);
      cards.map(card => {
        if (card.pronunciation) {
          card.audio = Card.getAudio(card.pronunciation);
        }
      });
      return cards;
    });
  }

  public get(id: number) {
    return this.requestGet(`en/cards/${id}/`).map(res => {
      return plainToClass(Card, res);
    });
  }

  public delete(card: Card) {
    return this.requestDelete(`en/cards/${card.id}/`);
  }

  public save(card: Card) {
    let request = null;

    if (card.image) {
      delete card.remoteImage;
      delete card.image;
    }
    if (card.id) {
      request = this.requestPatch(`en/cards/${card.id}/`, card);
    } else {
      request = this.requestPost(`en/cards/`, card);
    }
    return request.map(res => {
      return plainToClass(Card, res);
    });
  }

}
