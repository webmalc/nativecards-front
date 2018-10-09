import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordFormPage } from './word-form';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { CardsProvider } from '../../providers/cards/cards';
import { DecksProvider } from '../../providers/decks/decks';
import { ImagesProvider } from '../../providers/images/images';
import { TranslationProvider } from '../../providers/translation/translation';
import { SynonymsProvider } from '../../providers/synonyms/synonyms';
import { DictionaryProvider } from '../../providers/dictionary/dictionary';

@NgModule({
  declarations: [
    WordFormPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(WordFormPage),
  ],
  providers: [
    DecksProvider,
    CardsProvider,
    ImagesProvider,
    TranslationProvider,
    SynonymsProvider,
    DictionaryProvider,
  ],
})
export class WordFormPageModule { }
