import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Evenement} from '../../../../models/evenement.model';
import {MatDialog} from '@angular/material/dialog';
import {EventService} from '../../../../services/event.service';
import {ConfirmDialogComponent} from '../../../../@root/components/confirm-dialog/confirm-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  userType: String = null;
  userId: String = null;
  members: any[];
  verificationMap = new Map<string, boolean>();
  selectedOption : String = "All";

  /** Subject that emits when the component has been destroyed. */
    // tslint:disable-next-line:variable-name
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'lieu', 'date', 'actions'];
  dataSource: Evenement[] = [];
  dataSource2: MatTableDataSource<Evenement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  constructor(private eventService: EventService,
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
     this.eventService.getAllEventsMembers().then(res => {
       for (const i of res){
         this.verificationMap.set(i.id.evenement_id+";"+i.id.organisateur_id, true);
       }
     }).catch((error) => {
       console.log(error);
     });
    this.eventService.getAllEvents().then(data => {
      this.dataSource = data;
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    }).catch((error) => {
      console.log(error);
    });

  }

  onRemoveEvent(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      if (isDeleteConfirmed) {
        this.eventService.deleteMembreEventOfEvent(id).then().catch((error) => {
          console.log(error);
        });
        this.eventService.removeEventById(id).then(() => this.fetchDataSource()).catch((error) => {
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
    this.eventService.getEventsByMemberId(this.userId.toString()).then(
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
