import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemberService} from '../../../../services/member.service';
import {Member} from '../../../../models/memeber.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AlertTeacherDialogComponent} from '../../../../@root/components/alert-teacher-dialog/alert-dialog.component';
import {Router} from '@angular/router';
import {LoginService} from '../../../../services/login.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {

  userType: String = null;
  userId: String = null;
  memberType: String = null;
  members: any[];
  verificationMap = new Map<string, boolean>();
  selectedOption : String = "All";

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'cin', 'nom', 'cv', 'dateNaissance', 'email' ,'type','actions'];
  dataSource: Member[] = [];
  dataSource2: MatTableDataSource<Member>;
  typesList: String[] = [];
  membersTypes = new Map<string, string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  constructor(private memberService: MemberService,
              private loginService: LoginService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.loadMember();
    this.fetchDataSource();
  }

   fetchDataSource(): void {
     this.selectedOption = "All";
     this.memberService.getAllMembers().then(res => {
       for (const i of res){
         if (this.userId == i.id){
           this.verificationMap.set(i.id.toString(), true);
         }
       }
     }).catch((error) => {
       console.log(error);
     });
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
      for (const item of data){
        if (item.grade){
          this.membersTypes.set(item.id.toString(), "Teacher");
        }else {
          this.membersTypes.set(item.id.toString(), "Student");
        }
      }
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    }).catch((error) => {
      console.log(error);
    });
  }

  warningDialog(): void {
    const dialogRef = this.dialog.open(AlertTeacherDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
  }

  onRemoveMember(id: any, email: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      // console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then((response) => {
          this.fetchDataSource();
          try {
            this.memberService.getMemberById(id).then((res) => {
              if (res != null){
                console.log("teacher");
                this.warningDialog();
              }else {
                this.loginService.getUser(email.toString()).then(res => {
                  console.log("res.id: "+res.id);
                  this.loginService.remove(res.id.toString());
                }).catch((error) => {
                  console.log(error);
                });
              }
            }).catch((error) => {
              console.log(error);
            });
          }catch (e){
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }


  redirectToEdit(element: any): void {
    if (this.membersTypes.get(element.id.toString()) == "Teacher"){
      this.router.navigate([`./members/${Number(element.id)}/editTeacher`]);
    }else{
      this.router.navigate([`./members/${Number(element.id)}/editStudent`]);
    }
  }

//
  ngAfterViewInit() {
    if (this.dataSource2){
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  loadMember(): void{
    this.userType = localStorage.getItem('role');
    this.userId = localStorage.getItem('memberId');
    this.memberType = localStorage.getItem('memberType');
  }

  loadTeachers(): void{
    this.memberService.getAllTeachers().then(
      res => {
        this.dataSource = res;
        this.dataSource2 = new MatTableDataSource(res);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.selectedOption = "Teachers";
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  loadStudents(): void{
    this.memberService.getAllStudents().then(
      res => {
        this.dataSource = res;
        this.dataSource2 = new MatTableDataSource(res);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.selectedOption = "Students";
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  loadMyStudents(): void{
    this.memberService.getStudentByTeacher(this.userId.toString()).then(
      res => {
        this.dataSource = res;
        this.dataSource2 = new MatTableDataSource(res);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.selectedOption = "MyStudents";
      }
    ).catch((error) => {
      console.log(error);
    });
  }

}
