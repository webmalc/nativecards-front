import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { CardsProvider } from '../../providers/cards/cards'
import { BasePage } from '../../lib/page';
import { Query } from '../../models/query';
import { Deck } from '../../models/deck';
import { Card } from '../../models/card';


@IonicPage()
@Component({
  selector: 'page-lesson-dashboard',
  templateUrl: 'lesson-dashboard.html',
})
export class LessonDashboardPage extends BasePage {

  public decks: Array<Deck>;

  public cards: Array<Card>;

  public query: Query;

  public isSearching: boolean = false;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public decksProvider: DecksProvider,
    public cardsProvider: CardsProvider,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    this.query = new Query();
    let query = this.params.get('query');
    if (query) {
      this.query = query;
    }
  }

  public ionViewWillEnter() {
    this.decksProvider.fetchEnabled().subscribe(decks => {
      this.decks = decks.results;
    }, error => {
      this.showMessage()
    });
    this.loadLesson();
  }

  public loadLesson() {

    this.cards = null;
    this.isSearching = true;
    this.cardsProvider.lessons(this.query).subscribe(cards => {
      this.isSearching = false;
      this.cards = cards;
    }, error => {
      this.isSearching = false;
      this.showMessage()
    });
  }
}
