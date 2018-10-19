import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CardsProvider } from '../../providers/cards/cards'
import { BasePage } from '../../lib/page';
import { Card } from '../../models/card';
import { LessonDashboardPage } from '../lesson-dashboard/lesson-dashboard';
import { WordDisplayPage } from '../word-display/word-display';

@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage extends BasePage {

  @ViewChild(Content) content: Content;
  public cards: Array<Card>;
  public card: Card;
  public title: string;
  public page: number = 0;
  public attempt: number = 0;
  public skip: boolean = false;
  public answer: string;
  public isHint: boolean = false;
  public definition: boolean = false;
  public translation: boolean = false;
  public audio: boolean = false;
  public choices: boolean = false;
  public isSync: boolean = false;
  public statistics: Array<{ title: string, value: number, color: string }>;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public cardsProvider: CardsProvider,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    this.cards = this.params.get('cards');
    this.page = this.params.get('page');
    this._setTitle();
    this._getCard();
    this._showDefinition();
    this._showAudio();
  }

  // Set page title
  private _setTitle(): void {
    let max = this.cards.length;
    let current = this.page + 1;
    if (current > max) {
      this.title = 'Practice is completed';
    } else {
      this.title = `Step ${this.page + 1} of ${max}`;
    }
  }

  // Get current card
  private _getCard(): void {
    this.card = this.cards[this.page];
    if (!this.card) {
      this._sync();
      this._getStatistics();
    }
  }

  // Sync the answers with the server
  private _sync(): void {
    this.isSync = this.isAllSynced();
    this.cards.filter(card => card.answer && !card.isSync).map(card => {
      this.cardsProvider.attemptSave(card).subscribe(result => {
        card.isSync = true;
        this.isSync = this.isAllSynced();
      }, error => { return });
    });
  }

  // Check if all of the cards are synchronized
  public isAllSynced(): boolean {
    return this.cards.filter(card => !card.isSync).length == 0;
  }

  // Get current statistics from the cards
  private _getStatistics(): void {
    let correct = this.cards.reduce((a, c) => {
      return a + (c.isCorrect ? 1 : 0);
    }, 0);
    let incorrect = this.cards.reduce((a, c) => {
      return a + (c.isCorrect ? 0 : 1);
    }, 0);
    let flawless = this.cards.reduce((a, c) => {
      return a + (c.isCorrect && c.attempts == 0 ? 1 : 0);
    }, 0);
    this.statistics = [
      { 'title': 'attempts', 'value': this.cards.length, 'color': 'primary' },
      { 'title': 'correct answers', 'value': correct, 'color': 'primary-blue' },
      { 'title': 'flawless answers', 'value': flawless, 'color': 'secondary' },
      { 'title': 'incorrect answers', 'value': incorrect, 'color': 'dark' },
    ]
  }

  // Show card's definition
  private _showDefinition(): void {
    if (!this.card || !this.card.definition) {
      return;
    }
    if (this.card.form == 'write' || this.attempt > 0) {
      this.definition = true;
    }
    if (this.card.form == 'listen' && !this.card.pronunciation) {
      this.definition = true;
    }
  }

  // Show card's audio
  private _showAudio(): void {
    if (!this.card || !this.card.pronunciation) {
      return;
    }
    if (this.card.form == 'listen' || this.attempt > 0 ||
      (this.card.form == 'write' && !this.card.definition)) {
      this.audio = true;
      this.play(this.card.pronunciation);
    }
  }

  // Show card's translation
  private _showTranslation(): void {
    if (!this.card || !this.card.translation) {
      return;
    }
    if (this.attempt > 1) {
      this.translation = true;
    }
  }

  // Show card's choices
  private _showChoices(): void {
    if (!this.card || !this.card.choices) {
      return;
    }
    if (this.attempt > 2) {
      this.choices = true;
    }
  }

  // Play the audio file
  public play(url: string): void {
    if (!this.card.audio) {
      Card.playAudio(url);
    } else {
      this.card.audio.play();
    }
  }

  // Go to the next page
  public _nextPage(): void {
    this.navCtrl.setRoot(
      WordDisplayPage,
      { 'card': this.card, 'page': this.page + 1, 'cards': this.cards }
    );
  }

  // Save information about the answer to the card
  public _markAttempt(isCorrect: boolean): void {
    this.cards[this.page].isCorrect = isCorrect;
    this.cards[this.page].attempts = this.attempt;
    this.cards[this.page].answer = this.answer;
    this._sync();
  }

  // Get correct chars from the answer
  private _getChars(): number {
    let result = 0;
    let used = [];
    this.card.word.split('').forEach(char => {
      let index = this.answer.indexOf(char);
      if (index !== -1 && used.indexOf(index) === -1) {
        result += 1;
        used.push(index);
      }
    });
    return result;
  }

  // Get the user's answer
  public check() {
    if (this.answer.toLowerCase().trim() == this.card.word) {
      this._nextPage();
      this._markAttempt(true);
    } else {
      this.showMessage(
        'Sorry, wrong answer, try again! Correct: ' + this._getChars()
      );
      this.skip = true;
      this.isHint = true;
      this.attempt += 1;
      this._showDefinition();
      this._showAudio();
      this._showTranslation();
      this._showChoices();
      this.content.scrollToTop();
    }
  }

  // Skip current card
  public skipCard() {
    this._nextPage();
    this._markAttempt(false);
  }

  // Go to the lesson's dashboard
  public practice() {
    this.navCtrl.setRoot(LessonDashboardPage);
  }
}
