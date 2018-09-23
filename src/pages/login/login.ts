import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { BasePage } from '../../lib/page';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {

  private credentials = {
    username: '',
    password: '',
  };

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public events: Events,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl);
  }

  public login() {
    this.showLoading();

    this.auth.login(this.credentials).subscribe(user => {
      this.dismissLoading();
      if (user) {
        this.events.publish('user:login', user, Date.now());
        this.navCtrl.setRoot(DashboardPage);
      } else {
        this.showError('The login credentials are incorrect');
      }
    },
      error => {
        this.dismissLoading();
        this.showError(error);
      });
  }
}
