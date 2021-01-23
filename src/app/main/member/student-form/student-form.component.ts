import { Component, OnInit } from '@angular/core';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Teacher} from '../../../../models/teacher.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';
import {Student} from '../../../../models/student.model';
import {User} from '../../../../models/user';
import {LoginService} from '../../../../services/login.service';
import {AlertTeacherDialogComponent} from '../../../../@root/components/alert-teacher-dialog/alert-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginAgainComponent} from '../../../../@root/components/loginAgain/loginAgain.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {LoginDialogComponent} from '../../../../@root/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  addForm: FormGroup;
  public selectedTeacher: Teacher = null;
  public selectedDiploma: String = null;
  encadrants: Teacher[];
  currentItemId: string;
  item: Member;
  form: FormGroup;
  studentToSave: Student;
  newUser: User = new User();
  oldMail: String = null;
  userId: string;
  role: string;

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
        this.selectedDiploma = item.diplôme;
        this.oldMail = item.email;
        this.memberService.getAllTeachers().then(data => {
          this.encadrants = data;
          this.selectedTeacher = data.find(encadrant => this.item.encadrant.id === encadrant.id);
        }).catch((error) => {
          console.log(error);
        });
        this.item = item;
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
    this.memberService.getAllTeachers().then(data => this.encadrants = data).catch((error) => {
      console.log(error);
    });
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
      dateInscription: new FormControl(item?.dateInscription, [Validators.required]),
      diplôme: new FormControl(item?.diplôme, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      encadrant: new FormControl(item?.encadrant, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Student = {...this.item, ...this.form.value};
    this.studentToSave = {
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
      dateInscription: objectToSubmit.dateInscription,
      diplôme: objectToSubmit.diplôme,
      encadrant: objectToSubmit.encadrant,
    };

    this.newUser.username = objectToSubmit.email;
    this.newUser.email = objectToSubmit.email;
    this.newUser.password = objectToSubmit.password;
    this.newUser.role = ["user"];

    if (!!this.currentItemId) {
      this.memberService.getMemberbyEMAIL(this.studentToSave.email).then(
        (response) => {
          if (this.oldMail == this.studentToSave.email){
            this.updateMember(this.studentToSave);
          }else {
            this.emailDialog();
          }
        }
      ).catch(
        (e) => {
          this.updateMember(this.studentToSave);
        }
      );
    }else {
      console.log(this.newUser);
      this.memberService.getMemberbyEMAIL(this.studentToSave.email).then(
        (response) => {
            this.emailDialog();
        }
      ).catch(
        (e) => {
          this.memberService.createStudent(this.studentToSave).then((res) => {
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
    if (this.userId == this.currentItemId && this.role != "ROLE_ADMIN"){
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
    this.memberService.updateEtudiant(item.id,item).then(() => {
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
