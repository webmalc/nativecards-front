import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ComponentsModule } from '../../components/components.module';
import { DashboardProvider } from '../../providers/dashboard/dashboard';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DashboardPage),
  ],
  providers: [
    DashboardProvider
  ],
  exports: []
})
export class DashboardPageModule { }
