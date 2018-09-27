import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordsPage } from './words';
import { ComponentsModule } from '../../components/components.module';
import { DecksProvider } from '../../providers/decks/decks'
import { CardsProvider } from '../../providers/cards/cards'

@NgModule({
  declarations: [
    WordsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(WordsPage),
  ],
  providers: [
    DecksProvider,
    CardsProvider,
  ],
})
export class WordsPageModule { }
