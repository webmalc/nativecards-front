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
              'value': data.today_attempts,
              'color': 'primary'
            },
            {
              'title': 'correct attempts',
              'value': data.today_correct_attempts,
              'color': 'secondary'
            },
            {
              'title': 'incorrect attempts',
              'value': data.today_incorrect_attempts,
              'color': 'dark'
            },
          ]
        });
        widgets.push({
          'title': 'Week',
          'elements': [
            {
              'title': 'attempts',
              'value': data.week_attempts,
              'color': 'primary'
            },
            {
              'title': 'correct attempts',
              'value': data.week_correct_attempts,
              'color': 'secondary'
            },
            {
              'title': 'incorrect attempts',
              'value': data.week_incorrect_attempts,
              'color': 'dark'
            },
          ]
        });
        widgets.push({
          'title': 'Month',
          'elements': [
            {
              'title': 'attempts',
              'value': data.month_attempts,
              'color': 'primary'
            },
            {
              'title': 'correct attempts',
              'value': data.month_correct_attempts,
              'color': 'secondary'
            },
            {
              'title': 'incorrect attempts',
              'value': data.month_incorrect_attempts,
              'color': 'dark'
            },
          ]
        });
        widgets.push({
          'title': 'Cards',
          'elements': [
            {
              'title': 'total',
              'value': data.total_cards,
              'color': 'primary'
            },
            {
              'title': 'learned',
              'value': data.learned_cards,
              'color': 'secondary'
            },
            {
              'title': 'unlearned',
              'value': data.unlearned_cards,
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
