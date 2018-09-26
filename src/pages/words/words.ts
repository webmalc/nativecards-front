import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { BasePage } from '../../lib/page';
import { Query } from '../../models/query';
import { Deck } from '../../models/deck';

@IonicPage()
@Component({
  selector: 'page-words',
  templateUrl: 'words.html',
})
export class WordsPage extends BasePage {

  public query: Query;
  public decks: Array<Deck>;
  public words;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public decksProvider: DecksProvider,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    this.query = new Query();
    let query = this.params.get('query');
    if (query) {
      this.query = query;
      this.search();
    }
  }

  public ionViewWillEnter() {
    this.decksProvider.fetchEnabled().subscribe(decks => {
      this.decks = decks.results;
    }, error => {
      this.showMessage()
    });
  }

  // Search for a card
  public search() {
    console.log(this.query);
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
