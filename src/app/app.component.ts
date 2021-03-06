import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../models/user'

import { AuthProvider } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
import { DecksPage } from '../pages/decks/decks';
import { WordsPage } from '../pages/words/words';
import { LessonDashboardPage } from '../pages/lesson-dashboard/lesson-dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public user: User;
  public rootPage: any = HomePage;

  public pages: Array<{ title: string, icon: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public auth: AuthProvider,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Practice', 'icon': 'school', component: LessonDashboardPage },
      { title: 'Dashboard', 'icon': 'speedometer', component: DashboardPage },
      { title: 'Cards', 'icon': 'photos', component: WordsPage },
      { title: 'Decks', 'icon': 'folder', component: DecksPage },
      { title: 'Settings', 'icon': 'settings', component: SettingsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.refreshToken().subscribe((user) => {
        this.user = user;
        this.nav.setRoot(DashboardPage);
      }, error => {
        this.nav.setRoot(LoginPage);
      });
      this.events.subscribe('user:login', (user, time) => {
        this.user = user;
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout().then(allowed => {
      this.nav.setRoot(LoginPage);
    },
      error => {
        alert(error);
      });
  }
}
