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
  selector: 'page-words',
  templateUrl: 'words.html',
})
export class WordsPage extends BasePage {

  public query: Query;
  public total: number;
  public decks: Array<Deck>;
  public cards: Array<Card>;
  public isSearching: boolean = false;
  public advancedSearch: boolean = false;

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
    this.search();
  }

  // Search for a card
  public search() {
    this.total = null;
    this.cards = null;
    this.isSearching = true;
    this.query.next = null;
    this.cardsProvider.fetch(this.query).subscribe(words => {
      this.isSearching = false;
      this.cards = words.results;
      this.total = words.count;
      this.query.next = words.next;
    }, error => {
      this.isSearching = false;
      this.showMessage()
    });
  }

  // Load more cards on scrolling
  public loadMore(infiniteScroll) {
    this.cardsProvider.fetch(this.query).subscribe(words => {
      this.cards.concat(words.results);
      this.cards = this.cards.concat(words.results);
      this.query.next = words.next;
      infiniteScroll.complete();
    }, error => {
      this.showMessage()
      infiniteScroll.complete();
    });
  }

  // Show the word
  public show() {
    console.log('show');
  }

  // Play the audio file
  public play(url: string) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }
}
