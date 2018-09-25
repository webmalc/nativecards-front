import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from '../pages/login/login.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { DecksPageModule } from '../pages/decks/decks.module';
import { DeckFormPageModule } from '../pages/deck-form/deck-form.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { DashboardProvider } from '../providers/dashboard/dashboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    DashboardPageModule,
    SettingsPageModule,
    DecksPageModule,
    DeckFormPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DashboardProvider
  ]
})
export class AppModule { }
