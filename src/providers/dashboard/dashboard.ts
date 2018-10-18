import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class DashboardProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch() {
    return Observable.create(observer => {
      this.requestGet('en/attempts/statistics/').subscribe(data => {
        let widgets = [];
        widgets.push({
          'title': 'Today',
          'elements': [
            {
              'title': 'attempts',
              'value': data.todayAttempts,
              'color': 'primary'
            },
            {
              'title': 'correct answers',
              'value': data.todayCorrectAttempts,
              'color': 'secondary'
            },
            {
              'title': 'incorrect answers',
              'value': data.todayIncorrectAttempts,
              'color': 'dark'
            },
          ]
        });
        widgets.push({
          'title': 'Week',
          'elements': [
            {
              'title': 'attempts',
              'value': data.weekAttempts,
              'color': 'primary'
            },
            {
              'title': 'correct answers',
              'value': data.weekCorrectAttempts,
              'color': 'secondary'
            },
            {
              'title': 'incorrect answers',
              'value': data.weekIncorrectAttempts,
              'color': 'dark'
            },
          ]
        });
        widgets.push({
          'title': 'Month',
          'elements': [
            {
              'title': 'attempts',
              'value': data.monthAttempts,
              'color': 'primary'
            },
            {
              'title': 'correct answers',
              'value': data.monthCorrectAttempts,
              'color': 'secondary'
            },
            {
              'title': 'incorrect answers',
              'value': data.monthIncorrectAttempts,
              'color': 'dark'
            },
          ]
        });
        widgets.push({
          'title': 'Cards',
          'elements': [
            {
              'title': 'total',
              'value': data.totalCards,
              'color': 'primary'
            },
            {
              'title': 'learned',
              'value': data.learnedCards,
              'color': 'secondary'
            },
            {
              'title': 'unlearned',
              'value': data.unlearnedCards,
              'color': 'dark'
            },
          ]
        });
        observer.next(widgets);
        observer.complete();
      }, error => {
        observer.error();
        observer.complete();
      })
    });
  }
}
