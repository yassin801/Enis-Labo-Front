import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Tool} from '../../../../models/tool.model';
import {ToolService} from '../../../../services/tool.service';
import {LoginService} from '../../../../services/login.service';
import {Member} from '../../../../models/memeber.model';
import {MemberService} from '../../../../services/member.service';


@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit, OnDestroy  {

  userType: String = null;
  userId: String = null;
  members: any[];
  verificationMap = new Map<string, boolean>();
  selectedOption : String = "All";

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'CreatedDate', 'Source', 'actions'];
  dataSource: Tool[] = [];
  dataSource2: MatTableDataSource<Tool>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  constructor(private toolService: ToolService,
              private loginservice: LoginService,
              private memberService: MemberService,
              private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    //this.loginservice.send.subscribe(response => {this.loadMember(); });
    this.loadMember();
    this.fetchDataSource();
  }

   fetchDataSource(): void {
    this.selectedOption = "All";
    this.toolService.getAllToolsMembers().then(res => {
      for (const i of res){
        this.verificationMap.set(i.id.outil_id+";"+i.id.utilisateur_id, true);
      }
    }).catch((error) => {
      console.log(error);
    });
    this.toolService.getAllTools().then(data => {
      this.dataSource = data;
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    }).catch((error) => {
      console.log(error);
    });

  }

  onRemoveTool(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      // console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.toolService.deleteMembreToolOfTool(id).then().catch((error) => {
          console.log(error);
        });
        this.toolService.removeToolById(id).then(() => this.fetchDataSource()).catch((error) => {
          console.log(error);
        });
      }
    });
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
  }

  loadMine(): void{
    this.toolService.getToolsByMemberId(this.userId.toString()).then(
      res => {
        this.dataSource = res;
        this.dataSource2 = new MatTableDataSource(res);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.selectedOption = "Mine";
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  }
