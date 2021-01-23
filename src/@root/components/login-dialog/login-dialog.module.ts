import {NgModule} from '@angular/core';

import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginDialogComponent} from "./login-dialog.component";

@NgModule({
  declarations: [
    LoginDialogComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    LoginDialogComponent
  ],
})
export class LoginDialogModule {
}
