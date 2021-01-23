import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from '../../../../models/teacher.model';
import {MemberService} from '../../../../services/member.service';
import {Member} from '../../../../models/memeber.model';
import {User} from '../../../../models/user';
import {LoginService} from '../../../../services/login.service';
import {LoginDialogComponent} from '../../../../@root/components/login-dialog/login-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {LoginAgainComponent} from '../../../../@root/components/loginAgain/loginAgain.component';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  addForm: FormGroup;
  currentItemId: string;
  item: Member;
  form: FormGroup;
  enseignantToSave: Teacher;
  newUser: User = new User();
  oldMail: String = null;
  userId: string;
  private role: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
              private loginService: LoginService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('memberId');
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        this.oldMail = item.email;
        this.initForm(item);
        this.imageSrc = item.photo;
        this.addForm = new FormGroup({
          image: new FormControl("''", Validators.required),
          imageSrc: new FormControl(item?.photo, Validators.required)
        });
        if (item.photo == null){
          this.imageSrc = "assets/default.png";
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.initForm(null);
      this.addForm = new FormGroup({
        image: new FormControl(''),
        imageSrc: new FormControl('assets/default.png', Validators.required)
      });
      this.imageSrc = "assets/default.png";
    }
  }
  ///
  imageSrc: string;

  get f(){
    return this.addForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.addForm.patchValue({
          imageSrc: reader.result
        });

      };

    }
  }
  ///

  // tslint:disable-next-line:typedef
  initForm(item: Member) {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      grade: new FormControl(item?.grade, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      etablissement: new FormControl(item?.etablissement, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Teacher = {...this.item, ...this.form.value};
    this.enseignantToSave = {
      id: objectToSubmit.id,
      cin: objectToSubmit.cin,
      nom: objectToSubmit.nom,
      prenom: objectToSubmit.prenom,
      date: objectToSubmit.date,
      photo: this.imageSrc,
      cv: objectToSubmit.cv,
      email: objectToSubmit.email,
      password: objectToSubmit.password,
      pubs: objectToSubmit.pubs,
      evnts: objectToSubmit.evnts,
      outils: objectToSubmit.outils,
      grade: objectToSubmit.grade,
      etablissement: objectToSubmit.etablissement
    };

    this.newUser.username = objectToSubmit.email;
    this.newUser.email = objectToSubmit.email;
    this.newUser.password = objectToSubmit.password;
    this.newUser.role = ["user"];

    if (!!this.currentItemId) {
      this.memberService.getMemberbyEMAIL(this.enseignantToSave.email).then(
        (response) => {
          if (this.oldMail == this.enseignantToSave.email){
            this.updateMember(this.enseignantToSave);
          }else {
            this.emailDialog();
          }
        }
      ).catch(
        (e) => {
          this.updateMember(this.enseignantToSave);
        }
      );
    }else {
      console.log(this.newUser);
      this.memberService.getMemberbyEMAIL(this.enseignantToSave.email).then(
        (response) => {
          this.emailDialog();
        }
      ).catch(
        (e) => {
          this.memberService.createTeacher(this.enseignantToSave).then((res) => {
            if (res){
              this.loginService.register(this.newUser).then().catch((error) => {
                console.log(error);
              });
              this.router.navigate(['./members']);
            }
          }).catch((error) => {
            console.log(error);
          });
        }
      );
    }

  }

  onCancel(): void{
    if (this.userId == this.currentItemId && this.role!="ROLE_ADMIN"){
      this.router.navigate(['/members/'+this.userId+'/details']);
    }else {
      this.router.navigate(['./members']);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      if (isDeleteConfirmed) {
        this.logout();
        this.loginService.layoutEvent.emit();
      }
    });
  }

  logout(): void{
    this.loginService.logout();
    this.router.navigate(['./login']);
  }

  emailDialog(): void{
    const dialogRef = this.dialog.open(LoginAgainComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
  }

  updateMember(item: any): void{
    this.memberService.updateTeacher(item.id,item).then(() => {
      this.loginService.getUser(this.oldMail.toString()).then(
        data => {
          this.loginService.remove(data.id.toString()).then(
            () => {
              this.loginService.register(this.newUser).then(
                () => {
                  if (this.userId == this.currentItemId){
                    this.openDialog();
                  }else {
                    this.router.navigate(['./members']);
                  }
                }
              ).catch((error) => {
                console.log(error);
              });
            }
          ).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

}
