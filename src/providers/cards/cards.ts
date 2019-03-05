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

  private addFiltersToPath(path: string, query: Query): string {
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
      let searchType = query.isStartsWithSearch() ? 'word_starts' : 'search';
      path = this.updateUrlParameter(path, searchType, query.getCleanedWord());
    }
    if (query.complete == 'learned') {
      path = this.updateUrlParameter(path, 'complete__gte', 100);
    }
    if (query.complete == 'in_process') {
      path = this.updateUrlParameter(path, 'complete__lte', 99);
      path = this.updateUrlParameter(path, 'complete__gte', 1);
    }
    if (query.complete == 'almost_learned') {
      path = this.updateUrlParameter(path, 'complete__lte', 99);
      path = this.updateUrlParameter(path, 'complete__gte', 70);
    }
    if (query.complete == 'just_started') {
      path = this.updateUrlParameter(path, 'complete__lte', 30);
      path = this.updateUrlParameter(path, 'complete__gte', 1);
    }
    if (query.complete == 'not_practiced') {
      path = this.updateUrlParameter(path, 'complete__lte', 0);
    }
    if (query.sortBy) {
      path = this.updateUrlParameter(path, 'ordering', query.sortBy);
    }

    return path;
  }

  public fetch(query: Query) {
    let path = this.addFiltersToPath('en/cards/', query);

    if (query.next) {
      path = this.getUrlPath(query.next);
    }
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
    let path = this.addFiltersToPath('en/cards/lesson/', query);

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
