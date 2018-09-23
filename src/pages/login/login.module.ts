import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule { }
