import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule { }
