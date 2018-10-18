import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonPage } from './lesson';

import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module'
import { CardsProvider } from '../../providers/cards/cards'

@NgModule({
  declarations: [
    LessonPage,
  ],
  imports: [
    ComponentsModule,
    DirectivesModule,
    MarkdownModule.forChild(),
    IonicPageModule.forChild(LessonPage),
  ],
  providers: [
    CardsProvider,
  ],
})
export class LessonPageModule { }
