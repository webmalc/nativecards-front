import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { BasePage } from '../../lib/page';
import { Deck } from '../../models/deck';

@IonicPage()
@Component({
  selector: 'page-deck-form',
  templateUrl: 'deck-form.html',
})
export class DeckFormPage extends BasePage {

  public deck: Deck;
  public id: number;
  public title: string = 'New deck';
  public isSaving: boolean = false;
  public errors = {};

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public decksProvider: DecksProvider,
    public alertCtrl: AlertController
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    let deck = this.params.get('deck');
    if (deck) {
      this.id = deck.id;
      this._setTitle(deck);
    } else {
      this.deck = new Deck();
    }
  }

  private _setTitle(deck: Deck) {
    this.title = `Edit deck "${deck.title}"`;
  }

  ionViewDidLoad() {
    if (this.id) {
      this.deck = null;
      this.decksProvider.get(this.id).subscribe(deck => {
        this.deck = deck;
      }, error => {
        this.showMessage()
      });
    }
  }

  // Delete the deck
  public delete() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'All cards in the deck will also  be deleted',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Proceed',
          handler: () => {
            this.isSaving = true;
            let navTransition = confirm.dismiss();

            this.decksProvider.delete(this.deck).subscribe(deck => {
              navTransition.then(() => {
                this.showMessage('The deck was successfully deleted');
                this.navCtrl.pop();
              });
            }, error => {
              this.isSaving = false;
              this.showMessage();
            })
            return false;
          }
        }
      ]
    });
    confirm.present();
  }

  // Save the deck
  public save() {
    this.isSaving = true;
    this.errors = {};

    this.decksProvider.save(this.deck).subscribe(deck => {
      this.deck = deck;
      this.id = deck.id;
      this._setTitle(deck);
      this.isSaving = false;
      this.showMessage('The deck is successfully saved');
    }, error => {
      this.isSaving = false;
      this.errors = error;
      this.showMessage();
    })
  }
}
