import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckFormPage } from './deck-form';
import { ComponentsModule } from '../../components/components.module';
import { DecksProvider } from '../../providers/decks/decks'

@NgModule({
  declarations: [
    DeckFormPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DeckFormPage),
  ],
  providers: [
    DecksProvider
  ],
})
export class DeckFormPageModule { }
