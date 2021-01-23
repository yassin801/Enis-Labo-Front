import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './loginFailed.component.html',
  styleUrls: ['./loginFailed.component.scss']
})
export class LoginFailedComponent implements OnInit {

  public title = 'Warning!';
  public message = 'Login failed, wrong email or password! ';
  public cancelButtonLabel = 'Ok';

  /**
   * Constructor
   *
   * @param {MatDialogRef<LoginFailedComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<LoginFailedComponent>
  ) {
  }

  ngOnInit(): void {

    }

}
