import { Base } from './base'

export class Card extends Base {

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
}
