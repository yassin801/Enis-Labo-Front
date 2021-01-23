import {NgModule} from '@angular/core';

import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginAgainComponent} from './loginAgain.component';
import {ConfirmDialogModule} from '../confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    LoginAgainComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    LoginAgainComponent
  ],
})
export class LoginAgainModule {
}
