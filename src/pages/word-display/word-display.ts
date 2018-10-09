import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { BasePage } from '../../lib/page';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { CardsProvider } from '../../providers/cards/cards'
import { SettingsProvider } from '../../providers/settings/settings'
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';
import { Settings } from '../../models/settings';
import { WordFormPage } from '../word-form/word-form'

@IonicPage()
@Component({
  selector: 'page-word-display',
  templateUrl: 'word-display.html',
})
export class WordDisplayPage extends BasePage {

  public card: Card;
  public settings: Settings;
  public deck: Deck;
  public title: string;
  public id: number;
  public deckId: number;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public decksProvider: DecksProvider,
    public cardsProvider: CardsProvider,
    public settingsProvider: SettingsProvider,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    let card = this.params.get('card');
    this.id = card.id
    this.deckId = card.deck
    this.title = `Display card "${card.word}"`;
  }

  ionViewDidEnter() {
    this.card = null;

    Observable.forkJoin(
      this.cardsProvider.get(this.id),
      this.settingsProvider.fetch(),
    ).subscribe(data => {
      this.card = Card.getInstance(data[0]);
      this.settings = Settings.getInstance(data[1]);
      if (this.card.pronunciation && this.settings.playAudioOnOpen) {
        this.play(this.card.pronunciation);
      }
    }, error => {
      this.showMessage()
    });

    this.decksProvider.get(this.deckId).subscribe(deck => {
      this.deck = deck;
    }, error => {
      this.showMessage()
    });
  }

  // Edit the card
  public edit() {
    this.navCtrl.push(WordFormPage, { 'card': this.card });
  }

  public getColor(value: number, max: number = 100) {
    let percent = Math.round((value * 100) / max);
    if (percent < 25) {
      return 'danger';
    }
    if (percent < 50) {
      return 'dark';
    }
    if (percent < 75) {
      return 'primary';
    }
    if (percent <= 100) {
      return 'secondary';
    }
    return 'primary';
  }

  // Play the audio file
  public play(url: string) {
    Card.playAudio(url);
  }
}
