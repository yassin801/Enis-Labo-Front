import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MemberService} from '../../../services/member.service';
import {ToolService} from '../../../services/tool.service';
import {PublicationService} from '../../../services/publication.service';
import {EventService} from '../../../services/event.service';
import {Student} from '../../../models/student.model';
import {Teacher} from '../../../models/teacher.model';
import {Publication} from '../../../models/publication.model';
import {Tool} from '../../../models/tool.model';
import {Evenement} from '../../../models/evenement.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'myNewApp';

  students: Student[];
  teachers: Teacher[];
  publications: Publication[];
  tools: Tool[];
  events: Evenement[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private memberService: MemberService,
    private toolService: ToolService,
    private publicationService: PublicationService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void{
    this.memberService.getAllTeachers().then(
      res => {
        this.teachers = res;
      }
    ).catch((e) => console.log(e));
    this.memberService.getAllStudents().then(
      res => {
        this.students = res;
      }
    ).catch((e) => console.log(e));
    this.toolService.getAllTools().then(
      res => {
        this.tools = res;
      }
    ).catch((e) => console.log(e));
    this.eventService.getAllEvents().then(
      res => {
        this.events = res;
      }
    ).catch((e) => console.log(e));
    this.publicationService.getAllPublications().then(
      res => {
        this.publications = res;
      }
    ).catch((e) => console.log(e));
  }

  goToEvents(): void{
    this.router.navigate([`./events`]);
  }
  goToTools(): void{
    this.router.navigate([`./tools`]);
  }

  goToPubs(): void{
    this.router.navigate([`./articles`]);
  }

  goToMembers(): void{
    this.router.navigate([`./members`]);
  }


}
