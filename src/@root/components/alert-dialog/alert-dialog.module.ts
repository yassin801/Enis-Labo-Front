import {NgModule} from '@angular/core';

import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AlertDialogComponent} from './alert-dialog.component';
import {ConfirmDialogModule} from '../confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    AlertDialogComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    AlertDialogComponent
  ],
})
export class AlertDialogModule {
}
