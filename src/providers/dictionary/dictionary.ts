import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { plainToClass } from "class-transformer";
import { Dictionary } from '../../models/dictionary';

@Injectable()
export class DictionaryProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch(word: string) {
    return this.requestGet('en/cards/definition/?word=' + word).map(res => {
      return plainToClass(Dictionary, res);
    });
  }
}
