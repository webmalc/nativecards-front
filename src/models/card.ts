import { Base, SelectValue } from './base'

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
  ]

  public word: string;

  public category: string;

  public definition: string;

  public examples: string;

  public synonyms: string;

  public antonyms: string;

  public translation: string;

  public transcription: string;

  public pronunciation: string;

  public complete: number;

  public priority: number;

  public priorityDisplay: string;

  public deck: number;

  public note: string;

  public image: string;

  public remoteImage: string;

  public lastShowedAt: string;

  // Play the audio file with pronunciation
  static playAudio(url: string) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }
}
