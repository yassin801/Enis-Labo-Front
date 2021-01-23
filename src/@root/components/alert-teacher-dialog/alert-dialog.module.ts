import {NgModule} from '@angular/core';

import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AlertTeacherDialogComponent} from './alert-dialog.component';
import {ConfirmDialogModule} from '../confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    AlertTeacherDialogComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    AlertTeacherDialogComponent
  ],
})
export class AlertTeacherDialogModule {
}
