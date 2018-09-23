import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {
  @Input() title: string;
  @Input() menu: boolean = true;

  public constructor(
    public navCtrl: NavController) { }

  public goHome() {
    this.navCtrl.setRoot(DashboardPage);
  }
}
