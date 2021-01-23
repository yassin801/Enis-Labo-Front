import { Component, OnInit } from '@angular/core';
import {Evenement} from '../../../../models/evenement.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import {Publication} from '../../../../models/publication.model';
import {PublicationService} from '../../../../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  userType: String = null;
  userId: String = null;

  currentItemId: string;
  item: Publication;
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.loadMember();
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.publicationService.getPublicationById(this.currentItemId).then(item => {
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
  initForm(item: Publication) {
    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      sourcepdf: new FormControl(item?.sourcepdf, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      lien:new FormControl(item?.lien, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Publication = {...this.item, ...this.form.value};
    if (!!this.currentItemId) {
      this.publicationService.updatePublication(objectToSubmit).then(() => this.router.navigate(['./articles'])).catch((error) => {
        console.log(error);
      });
    }else {
      this.publicationService.createPublication(objectToSubmit).then(
        (res) => {
          if (this.userId){
            this.publicationService.addAuthorToPublication(Number(this.userId), Number(res.id)).then(() => {
              this.router.navigate(['./articles']).catch((error) => {
                console.log(error);
              });
            });
          }else {
            this.router.navigate(['./articles']).catch((error) => {
              console.log(error);
            });
          }
        }
      );
    }

  }

  loadMember(): void{
    this.userType = localStorage.getItem('role');
    this.userId = localStorage.getItem('memberId');
    console.log("userId: "+this.userId)
  }

}
