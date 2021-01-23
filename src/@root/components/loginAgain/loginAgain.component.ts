import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './loginAgain.component.html',
  styleUrls: ['./loginAgain.component.scss']
})
export class LoginAgainComponent implements OnInit {

  public title = 'Warning!';
  public message = 'Email Already Exists!';
  public cancelButtonLabel = 'Ok';

  /**
   * Constructor
   *
   * @param {MatDialogRef<LoginAgainComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<LoginAgainComponent>
  ) {
  }

  ngOnInit(): void {

    }

}
