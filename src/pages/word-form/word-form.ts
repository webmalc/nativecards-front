import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BasePage } from '../../lib/page';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { CardsProvider } from '../../providers/cards/cards'
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';

@IonicPage()
@Component({
  selector: 'page-word-form',
  templateUrl: 'word-form.html',
})
export class WordFormPage extends BasePage {

  public card: Card;
  public deck: Deck;
  public id: number;
  public title: string = 'New card';
  public isSaving: boolean = false;
  public errors = {};

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
    let card = this.params.get('card');
    if (card) {
      this.id = card.id
      this.title = `Edit card "${card.word}"`;
    } else {
      this.card = new Card();
    }
  }

  ionViewDidLoad() {
    if (this.id) {
      this.card = null;
      this.cardsProvider.get(this.id).subscribe(card => {
        this.card = card;
      }, error => {
        this.showMessage()
      });
    }
  }

}
