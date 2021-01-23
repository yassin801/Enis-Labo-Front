import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  public title = 'Warning!';
  public message = 'The user is already added or it doesnt exist';
  public cancelButtonLabel = 'Ok';

  /**
   * Constructor
   *
   * @param {MatDialogRef<AlertDialogComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>
  ) {
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
