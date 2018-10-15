import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonDashboardPage } from './lesson-dashboard';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module'
import { DecksProvider } from '../../providers/decks/decks'
import { CardsProvider } from '../../providers/cards/cards'

@NgModule({
  declarations: [
    LessonDashboardPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicPageModule.forChild(LessonDashboardPage),
  ],
  providers: [
    DecksProvider,
    CardsProvider,
  ],
})
export class LessonDashboardPageModule { }
