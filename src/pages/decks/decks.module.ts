import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecksPage } from './decks';
import { ComponentsModule } from '../../components/components.module';
import { DecksProvider } from '../../providers/decks/decks'

@NgModule({
  declarations: [
    DecksPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DecksPage),
  ],
  providers: [
    DecksProvider
  ],
})
export class DecksPageModule { }
