import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { BasePage } from '../../lib/page';
import { Settings } from '../../models/settings';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage extends BasePage {

  public settings: Settings;
  public isSaving: boolean = false;
  public errors = {};

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public settingsProvider: SettingsProvider,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
  }

  ionViewDidLoad() {
    this.settingsProvider.fetch().subscribe(settings => {
      this.settings = settings;
    }, error => {
      this.showMessage()
    })
  }

  // Save the settings
  public save() {
    this.isSaving = true;
    this.errors = {};

    this.settingsProvider.save(this.settings).subscribe(response => {
      this.isSaving = false;
      this.showMessage('The settings are successfully saved');
    }, error => {
      this.isSaving = false;
      this.errors = error;
      this.showMessage();
    })
  }
}
