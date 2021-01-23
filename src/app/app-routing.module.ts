import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {ToolListComponent} from "./main/tool/tool-list/tool-list.component";
import {ToolFormComponent} from "./main/tool/tool-form/tool-form.component";
import {PublicationListComponent} from "./main/publication/publication-list/publication-list.component";
import {PublicationFormComponent} from "./main/publication/publication-form/publication-form.component";
import {EventListComponent} from "./main/event/event-list/event-list.component";
import {EventFormComponent} from "./main/event/event-form/event-form.component";
import {ParticipantListComponent} from "./main/event/participant-list/participant-list.component";
import {CreatorsListComponent} from './main/tool/creators-list/creators-list.component';
import {AuthorsListComponent} from './main/publication/authors-list/authors-list.component';
import {TeacherFormComponent} from './main/member/teacher-form/teacher-form.component';
import {StudentFormComponent} from './main/member/student-form/student-form.component';
import {MemberDetailsComponent} from './main/member/member-details/member-details.component';
import {LoginComponent} from './main/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: ':id/details',
        pathMatch: 'full',
        component: MemberDetailsComponent,
      },
      {
        path: 'createTeacher',
        pathMatch: 'full',
        component: TeacherFormComponent,
      },

      {
        path: 'createStudent',
        pathMatch: 'full',
        component: StudentFormComponent,
      },
      {
        path: ':id/editTeacher',
        pathMatch: 'full',
        component: TeacherFormComponent,
      },

      {
        path: ':id/editStudent',
        pathMatch: 'full',
        component: StudentFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolFormComponent,
      },
      {
        path: ':id/creators',
        pathMatch: 'full',
        component: CreatorsListComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'articles',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PublicationListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },

      {
        path: ':id/authors',
        pathMatch: 'full',
        component: AuthorsListComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: ':id/participants',
        pathMatch: 'full',
        component: ParticipantListComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
