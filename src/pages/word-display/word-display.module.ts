import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module'
import { WordDisplayPage } from './word-display';
import { CardsProvider } from '../../providers/cards/cards'
import { DecksProvider } from '../../providers/decks/decks'

@NgModule({
  declarations: [
    WordDisplayPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(WordDisplayPage),
  ],
  providers: [
    DecksProvider,
    CardsProvider,
  ],
})
export class WordDisplayPageModule { }
