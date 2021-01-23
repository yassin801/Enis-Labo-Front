import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Evenement} from '../../../../models/evenement.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  userType: String = null;
  userId: String = null;

  currentItemId: string;
  item: Evenement;
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.loadMember();
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.eventService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.initForm(null);
    }
  }

  // tslint:disable-next-line:typedef
  initForm(item: Evenement) {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Evenement = {...this.item, ...this.form.value};
    if (!!this.currentItemId) {
      this.eventService.updateEvent(objectToSubmit).then(() => this.router.navigate(['./events'])).catch((error) => {
        console.log(error);
      });
    }else {
      this.eventService.createEvent(objectToSubmit).then((data) => {
        if (this.userId){
          this.eventService.addParticipantToEvent(Number(this.userId), Number(data.id)).then((data) => {
            this.router.navigate(['./events']);
          }).catch((error) => {
            console.log(error);
          });
        }else {
          this.router.navigate(['./events']);
        }
      });
    }

  }

  loadMember(): void{
    this.userType = localStorage.getItem('role');
    this.userId = localStorage.getItem('memberId');
  }

}
