import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { BasePage } from '../../lib/page';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage extends BasePage {

  public widgets: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dashboard: DashboardProvider,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
  }

  ionViewDidLoad() {
    this.dashboard.fetch().subscribe(widgets => {
      this.widgets = widgets;
    }, error => {
      this.showError()
    })
  }

}
