import {NgModule} from '@angular/core';

import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginFailedComponent} from './loginFailed.component';
import {ConfirmDialogModule} from '../confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    LoginFailedComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    LoginFailedComponent
  ],
})
export class LoginFailedModule {
}
