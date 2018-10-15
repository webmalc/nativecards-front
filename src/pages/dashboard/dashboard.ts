import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { BasePage } from '../../lib/page';
import { AuthProvider } from '../../providers/auth/auth';
import { Query } from '../../models/query';
import { WordsPage } from '../words/words';
import { LessonDashboardPage } from '../lesson-dashboard/lesson-dashboard';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage extends BasePage {

  public widgets: any;
  public query: Query;

  constructor(
    public navCtrl: NavController,
    public dashboard: DashboardProvider,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
    super(navCtrl, toastCtrl, loadingCtrl, auth);
    this.query = new Query();
  }

  public ionViewDidLoad() {
    this.dashboard.fetch().subscribe(widgets => {
      this.widgets = widgets;
    }, error => {
      this.showMessage()
    })
  }

  // Start a lesson
  public practice() {
    this.navCtrl.push(LessonDashboardPage);
  }

  public search() {
    this.navCtrl.push(WordsPage, { 'query': this.query });
  }
}
