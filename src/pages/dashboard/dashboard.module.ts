import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DashboardPage),
  ],
  exports: []
})
export class DashboardPageModule { }
