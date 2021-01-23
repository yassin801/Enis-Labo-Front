import { Component, OnInit } from '@angular/core';
import {Tool} from '../../../models/tool.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolService} from '../../../services/tool.service';
import {User} from '../../../models/user';
import {LoginService} from '../../../services/login.service';
import {MemberService} from '../../../services/member.service';
import {AlertTeacherDialogComponent} from '../../../@root/components/alert-teacher-dialog/alert-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginFailedComponent} from '../../../@root/components/loginFailed/loginFailed.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentItemId: string;
  item: User = new User();
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private memberService: MemberService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm(null);
  }

  // tslint:disable-next-line:typedef
  initForm(item: User) {
    this.form = new FormGroup({

      email: new FormControl(item?.email, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.item.email = this.form.value.email;
    this.item.username = this.form.value.email;
    this.item.password = this.form.value.password;
    this.loginService.login(this.item).then(res => {
      localStorage.setItem('user',res.email);
      localStorage.setItem('role',res.roles);
      localStorage.setItem('token',res.accessToken);
      localStorage.setItem('userid',res.id);
      this.router.navigate(['./dashboard']);
      this.memberService.getMemberbyEMAIL(res.email).then(data => {
        localStorage.setItem('memberId',data.id);
        localStorage.setItem('memberName',data.prenom + " " + data.nom);
        if (data.grade){
          localStorage.setItem('memberType',"teacher");
        }else {
          localStorage.setItem('memberType',"student");
        }
      });
      this.loginService.send.emit();
      this.loginService.layoutEvent.emit();
    }).catch((error) => {
      this.warningDialog();
      this.initForm(null);
    });
  }

  warningDialog(): void {
    const dialogRef = this.dialog.open(LoginFailedComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
  }

}
