import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordsPage } from './words';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WordsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(WordsPage),
  ],
  providers: [
  ],
})
export class WordsPageModule { }
