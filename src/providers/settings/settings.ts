import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Settings } from '../../models/settings';

@Injectable()
export class SettingsProvider extends Api {

  public constructor(protected http: HttpClient, protected storage: Storage) {
    super(http, storage);
  }

  public fetch() {
    return this.requestGet('en/settings/get/');
  }
  public save(settings: Settings) {
    return this.requestPatch('en/settings/save/', settings);
  }
}
