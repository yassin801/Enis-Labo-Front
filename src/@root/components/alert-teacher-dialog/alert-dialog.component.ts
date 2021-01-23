import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertTeacherDialogComponent implements OnInit {

  public title = 'Member cannot be deleted!';
  public message = 'This teacher is a mentor of a student.';
  public cancelButtonLabel = 'Ok';

  /**
   * Constructor
   *
   * @param {MatDialogRef<AlertTeacherDialogComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<AlertTeacherDialogComponent>
  ) {
  }

  ngOnInit(): void {

    }

}
