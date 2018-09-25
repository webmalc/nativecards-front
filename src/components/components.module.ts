import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { IonicPageModule } from 'ionic-angular';
import { LoadingComponent } from './loading/loading';

@NgModule({
  declarations: [
    NavbarComponent,
    LoadingComponent,
  ],
  imports: [
    IonicPageModule.forChild(NavbarComponent),
    IonicPageModule.forChild(LoadingComponent),
  ],
  exports: [
    NavbarComponent,
    LoadingComponent,
  ]
})
export class ComponentsModule { }
