import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { plainToClass } from "class-transformer";
import { Image } from '../../models/image';

@Injectable()
export class ImagesProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch(word: string) {
    return this.requestGet('en/cards/images/?word=' + word).map(res => {
      return plainToClass(Image, res);
    });
  }
}
