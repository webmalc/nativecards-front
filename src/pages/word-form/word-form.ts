import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BasePage } from '../../lib/page';
import { AuthProvider } from '../../providers/auth/auth';
import { DecksProvider } from '../../providers/decks/decks'
import { CardsProvider } from '../../providers/cards/cards'
import { ImagesProvider } from '../../providers/images/images'
import { TranslationProvider } from '../../providers/translation/translation';
import { SynonymsProvider } from '../../providers/synonyms/synonyms';
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';
import { Image } from '../../models/image';
import { DictionaryProvider } from '../../providers/dictionary/dictionary';

@IonicPage()
@Component({
  selector: 'page-word-form',
  templateUrl: 'word-form.html',
})
export class WordFormPage extends BasePage {

  public card: Card;
  public word: string;
  public decks: Array<Deck>;
  public images: Array<Image>;
  public selectedImage: string;
  public id: number;
  public title: string = 'New card';
  public isSaving: boolean = false;
  public isLoadingDictionary: boolean = false;
  public errors = {};

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public decksProvider: DecksProvider,
    public cardsProvider: CardsProvider,
    public imagesProvider: ImagesProvider,
    public translationProvider: TranslationProvider,
    public synonymsProvider: SynonymsProvider,
    public dictionaryProvider: DictionaryProvider,
    public alertCtrl: AlertController
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    let card = this.params.get('card');
    let word = this.params.get('word');
    if (card) {
      this.id = card.id
      this.word = card.word;
      this._setTitle(card);
    } else {
      this.word = word;
      this.card = Card.getDefaultInstance(this.word);
    }
  }

  private _setTitle(card: Card) {
    this.title = `Edit card "${card.word}"`;
  }

  public refresh() {
    this.card = Card.setDefaults(this.card);
    this.word = this.card.word;
    this.images = null;
    this.getImages();
    this.getCardData();
  }

  // get images
  public getImages() {
    this.imagesProvider.fetch(this.word).subscribe(images => {
      this.images = images;
      if (this.card && !this.card.image && this.images.length) {
        this.selectedImage = images[0].previewUrl;
        images[0].isSelected = true;
      }
    }, error => {
      this.showMessage()
    });
  }

  public getCardData() {
    // get translation
    this.translationProvider.fetch(this.word).subscribe(translation => {
      this.card.translation = translation;
    }, error => {
      this.showMessage()
    });

    // get synonyms and antonyms
    this.synonymsProvider.fetch(this.word).subscribe(data => {
      this.card.synonyms = data.synonyms;
      this.card.antonyms = data.antonyms;
    }, error => {
      this.showMessage()
    });

    // get a dictionary entry
    this.isLoadingDictionary = true;
    this.dictionaryProvider.fetch(this.word).subscribe(dict => {
      this.card.pronunciation = dict.pronunciation;
      this.card.transcription = dict.transcription;
      this.card.examples = dict.examples;
      this.card.definition = dict.definition;
      this.play(this.card.pronunciation);
      this.isLoadingDictionary = false;
    }, error => {
      this.showMessage()
    });
  }

  public ionViewDidEnter() {
    // get decks
    this.decksProvider.fetchEnabled().subscribe(decks => {
      this.decks = decks.results;
      if (!this.id) {
        this.card.setDefalutDeck(this.decks);
      }
    }, error => {
      this.showMessage()
    });

    this.getImages();

    if (!this.id && this.card) {
      this.getCardData();
    }

    // get card
    if (this.id) {
      this.card = null;
      this.cardsProvider.get(this.id).subscribe(card => {
        this.card = card;
        if (this.card.image) {
          this.selectedImage = card.image;
        }
      }, error => {
        this.showMessage()
      });
    }
  }

  // Select image for the card
  public selectImage(image: Image) {
    this.selectedImage = image.previewUrl;
    this.card.remoteImage = image.previewUrl;
    this.card.image = null;
    this.images = this.images.map(function(image) {
      image.isSelected = false;
      return image;
    });
    image.isSelected = true;
  }

  // Save the card
  public save() {
    this.isSaving = true;
    this.errors = {};
    this.cardsProvider.save(this.card).subscribe(card => {
      this.card = card;
      this.id = card.id;
      this._setTitle(card);
      this.isSaving = false;
      this.showMessage('The card is successfully saved');
    }, error => {
      this.isSaving = false;
      this.errors = error;
      console.log(this.errors);
      this.showMessage();
    })
  }

  // Delete the card
  public delete() {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'All statistics related to this card will also be deleted',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Proceed',
          handler: () => {
            this.isSaving = true;
            let navTransition = confirm.dismiss();

            this.cardsProvider.delete(this.card).subscribe(card => {
              navTransition.then(() => {
                this.showMessage('The card was successfully deleted');
                this.navCtrl.popToRoot();
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

  // Play the audio file
  public play(url: string) {
    Card.playAudio(url);
  }
}
