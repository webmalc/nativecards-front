import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordFormPage } from './word-form';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { CardsProvider } from '../../providers/cards/cards';
import { DecksProvider } from '../../providers/decks/decks';

@NgModule({
  declarations: [
    WordFormPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(WordFormPage),
  ],
  providers: [DecksProvider,
    CardsProvider,
  ],
})
export class WordFormPageModule { }
