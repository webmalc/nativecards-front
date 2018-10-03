import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkdownModule } from 'ngx-markdown';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { WordDisplayPage } from './word-display';
import { CardsProvider } from '../../providers/cards/cards';
import { DecksProvider } from '../../providers/decks/decks';
import { SettingsProvider } from '../../providers/settings/settings';

@NgModule({
  declarations: [
    WordDisplayPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    MarkdownModule.forChild(),
    IonicPageModule.forChild(WordDisplayPage),
  ],
  providers: [
    DecksProvider,
    CardsProvider,
    SettingsProvider,
  ],
})
export class WordDisplayPageModule { }
