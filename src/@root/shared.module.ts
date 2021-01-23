import {NgModule} from '@angular/core';
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "./components/confirm-dialog/confirm-dialog.module";
import { AlertDialogModule } from './components/alert-dialog/alert-dialog.Module';
import {AlertTeacherDialogModule} from './components/alert-teacher-dialog/alert-dialog.module';
import {LoginFailedModule} from './components/loginFailed/loginFailed.module';
import {LoginAgainComponent} from './components/loginAgain/loginAgain.component';
import {LoginAgainModule} from './components/loginAgain/loginAgain.module';
import {LoginDialogModule} from './components/login-dialog/login-dialog.module';


@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertDialogModule,
    ConfirmDialogModule,
    AlertTeacherDialogModule,
    LoginFailedModule,
    LoginAgainModule,
    LoginDialogModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertDialogModule,
    ConfirmDialogModule,
    AlertTeacherDialogModule,
    LoginFailedModule,
    LoginAgainModule,
    LoginDialogModule
  ],
  declarations: [],
})
export class SharedModule {
}
