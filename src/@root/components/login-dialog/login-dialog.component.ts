import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'confirm-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  public title = 'Warning!';
  public message = 'You need to login again for the changes to be saved!';
  public confirmButtonLabel = 'Ok';
  public confirmButtonColor = 'accent';


  /**
   * Constructor
   *
   * @param {MatDialogRef<LoginDialogComponent>} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
  }

}
