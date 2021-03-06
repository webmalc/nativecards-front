import { SelectValue } from './base';
import { Card } from './card';

export class Query {

  public sortings: Array<SelectValue> = Card.sortBy;

  public priorities: Array<SelectValue> = Card.priorities;

  public categories: Array<SelectValue> = Card.categories;

  public completeOptions: Array<SelectValue> = [
    new SelectValue('not practiced', 'not_practiced'),
    new SelectValue('in process', 'in_process'),
    new SelectValue('just started', 'just_started'),
    new SelectValue('almost learned', 'almost_learned'),
    new SelectValue('learned', 'learned'),
  ]

  public word: string;

  public isLatest: boolean = false;

  public deckId: number;

  public sortBy: string = 'word';

  public priority: number;

  public category: string;

  public action: string;

  public next: string;

  public previous: string;

  public complete: string;

  /**
   * Return the type of search
   */
  public isStartsWithSearch(): boolean {
    return this.word.slice(-1) === '*';
  }

  /**
   * Return the word without special chars like '*'
   */
  public getCleanedWord(): string {
    return this.word.slice(-1) === '*' ? this.word.slice(0, -1) : this.word
  }
}
