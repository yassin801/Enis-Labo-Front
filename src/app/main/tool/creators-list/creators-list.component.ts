import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Member} from '../../../../models/memeber.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../../../services/event.service';
import {MemberService} from '../../../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {AlertDialogComponent} from '../../../../@root/components/alert-dialog/alert-dialog.component';
import {ToolService} from '../../../../services/tool.service';
import {LoginService} from '../../../../services/login.service';

@Component({
  selector: 'app-creators-list',
  templateUrl: './creators-list.component.html',
  styleUrls: ['./creators-list.component.scss']
})
export class CreatorsListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  userType: String = null;
  userId: String = null;

  currentItemId: string;
  displayedColumns: string[] = ['id', 'cin', 'nom', 'email', 'cv', 'dateNaissance', 'actions'];
  dataSource: Member[] = [];
  form: FormGroup;
  participant: Member;
  members: Member[];
  cin: number ;

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor( private toolService: ToolService,
               private memberService: MemberService,
               private loginservice: LoginService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private dialog: MatDialog) {
    this.options = [];
  }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    //this.loginservice.send.subscribe(response => {this.loadMember(); });
    this.loadMember();

    this.initForm(null);
    this.fetchDataSource().then();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // tslint:disable-next-line:typedef
  initForm(participant: Member) {
    this.form = new FormGroup({
      cin: new FormControl(participant?.cin, [Validators.required]),
    });
  }

  private getCinList(): String[] {

    for(const i of this.members){
      this.options.push(i.cin);
    }
    return this.options;
  }

  private async fetchDataSource(): Promise<void> {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.toolService.getToolsMembers(this.currentItemId).then(data => this.dataSource = data).catch((error) => {
      console.log(error);
    });
    await this.memberService.getAllMembers().then(data => this.members = data).catch((error) => {
      console.log(error);
    });
    this.getCinList();
  }

  onSubmit(): void {
    if (this.cin == null) {
      this.activateAlert();
    }
    this.memberService.getMemberbyCin(this.cin.toString()).then(item => {
      if (item == null) {
        this.activateAlert();
      }
      this.participant = item;
      this.toolService.addUserToTool(Number(this.participant.id), this.activatedRoute.snapshot.params.id).then((data) => {
          this.fetchDataSource();
        }
      ).catch((error) => {
        console.log(error);
      });
      this.cin = null;
      this.initForm(null); }).catch((error) => {
      console.log(error);
    });
    this.reload();
  }

  private removeparticipant(memberid: any ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        // tslint:disable-next-line:max-line-length
        this.toolService.removeUserFromTool(Number(memberid), this.activatedRoute.snapshot.params.id).then(() => this.fetchDataSource()).catch((error) => {
          console.log(error);
        });
      }
    });
  }

  private activateAlert(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });
    this.cin = null;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadMember(): void{
    this.userType = localStorage.getItem('role');
    this.userId = localStorage.getItem('memberId');
    }

    verifyUser(id: any): boolean{
      for (const i of this.dataSource){
        if (i.id == id){
          return true;
        }
      }
      return false;
    }

  reload(): void{
    this.loadMember();
    this.initForm(null);
    this.fetchDataSource().then();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

}
