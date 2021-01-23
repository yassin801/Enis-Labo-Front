import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../@root/shared.module';
import {LayoutComponent} from './layout/layout.component';
import { ToolFormComponent } from './main/tool/tool-form/tool-form.component';
import { ToolListComponent } from './main/tool/tool-list/tool-list.component';
import { EventListComponent } from './main/event/event-list/event-list.component';
import { EventFormComponent } from './main/event/event-form/event-form.component';
import { PublicationFormComponent } from './main/publication/publication-form/publication-form.component';
import { PublicationListComponent } from './main/publication/publication-list/publication-list.component';
import { ParticipantListComponent } from './main/event/participant-list/participant-list.component';
import { CreatorsListComponent } from './main/tool/creators-list/creators-list.component';
import { AuthorsListComponent } from './main/publication/authors-list/authors-list.component';
import { StudentFormComponent } from './main/member/student-form/student-form.component';
import { TeacherFormComponent } from './main/member/teacher-form/teacher-form.component';
import { MemberDetailsComponent } from './main/member/member-details/member-details.component';
import { LoginComponent } from './main/login/login.component';
import {RequestInterceptor} from './RequestInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    ToolFormComponent,
    ToolListComponent,
    EventListComponent,
    EventFormComponent,
    PublicationFormComponent,
    PublicationListComponent,
    ParticipantListComponent,
    CreatorsListComponent,
    AuthorsListComponent,
    StudentFormComponent,
    TeacherFormComponent,
    MemberDetailsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [RequestInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {
}
