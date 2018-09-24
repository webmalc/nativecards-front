import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { ComponentsModule } from '../../components/components.module';
import { SettingsProvider } from '../../providers/settings/settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SettingsPage),
  ],
  providers: [
    SettingsProvider
  ],
})
export class SettingsPageModule { }
