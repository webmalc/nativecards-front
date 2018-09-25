import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { BasePage } from '../../lib/page';
import { Deck } from '../../models/deck';
import { DeckFormPage } from '../deck-form/deck-form';

@IonicPage()
@Component({
  selector: 'page-decks',
  templateUrl: 'decks.html',
})
export class DecksPage extends BasePage {

  public decks: Array<Deck>;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public decksProvider: DecksProvider,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
  }

  ionViewWillEnter() {
    this.decksProvider.fetch().subscribe(decks => {
      this.decks = decks.results;
    }, error => {
      this.showMessage()
    });
  }


  public edit(deck: Deck) {
    this.navCtrl.push(DeckFormPage, { 'deck': deck });
  }

  public create() {
    this.navCtrl.push(DeckFormPage);
  }
}
