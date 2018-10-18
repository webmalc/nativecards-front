import { Base, SelectValue } from './base'
import { Deck } from './deck'

export class Card extends Base {

  static categories: Array<SelectValue> = [
    new SelectValue('word', 'word'),
    new SelectValue('phrase', 'phrase'),
    new SelectValue('phrasal verb', 'phrasal_verb'),
  ]

  static priorities: Array<SelectValue> = [
    new SelectValue('very low', 0),
    new SelectValue('low', 1),
    new SelectValue('normal', 2),
    new SelectValue('high', 3),
    new SelectValue('very high', 4),
  ]

  static sortBy: Array<SelectValue> = [
    new SelectValue('word ⇑', 'word'),
    new SelectValue('word ⇓', '-word'),
    new SelectValue('complete ⇑', 'complete'),
    new SelectValue('complete ⇓', '-complete'),
    new SelectValue('priority ⇑', 'priority'),
    new SelectValue('priority ⇓', '-priority'),
    new SelectValue('created ⇑', 'created'),
    new SelectValue('created ⇓', '-created'),
  ]

  public getPriorities(): Array<SelectValue> {
    return Card.priorities;
  }

  public getCategories(): Array<SelectValue> {
    return Card.categories;
  }

  public word: string;

  public category: string = 'word';

  public categoryDisplay: string;

  public definition: string;

  public examples: string;

  public synonyms: string;

  public antonyms: string;

  public translation: string;

  public transcription: string;

  public pronunciation: string;

  public audio: any;

  public complete: number;

  public priority: number = 2;

  public priorityDisplay: string;

  public deck: number;

  public note: string;

  public image: string;

  public remoteImage: string;

  public lastShowedAt: string;

  public form: string;

  public choices: Array<string>;

  public attempts: number = 0;

  public isCorrect: boolean = true;

  public answer: string;

  public isSync: boolean = false;

  // Play the audio file with pronunciation
  static playAudio(url: string) {
    Card.getAudio(url).play();
  }

  // Get the audio file with pronunciation
  static getAudio(url: string) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    return audio;
  }

  static setDefaults(card: Card): Card {
    let loading = 'loading...';
    card.translation = loading;
    card.transcription = loading;
    card.definition = loading;
    card.examples = loading;
    card.antonyms = loading;
    card.synonyms = loading;
    return card;
  }

  static getDefaultInstance(word: string): Card {
    let card = new Card();
    card.word = word;
    card = Card.setDefaults(card);

    return card;
  }

  public setDefalutDeck(decks: Array<Deck>) {
    let defaultDecks = decks.filter((deck) => {
      return deck.isDefault;
    });
    if (defaultDecks.length) {
      this.deck = defaultDecks[0].id;
    }
  }
}
