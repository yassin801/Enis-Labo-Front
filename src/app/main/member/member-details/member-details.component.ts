import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../../services/member.service';
import {MatAccordion} from '@angular/material/expansion';
import {Member} from '../../../../models/memeber.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  userId: String = null;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  imageSrc: String;
  photo: string;
  currentItemId: string;
  currentItemDiplome: string;
  item: Member = {
    id: null,
    cin: null,
    nom: null,
    prenom: null,
    date: null,
    photo: null,
    cv: null,
    email: null,
    password: null,
    pubs: null,
    evnts: null,
    outils: null,
    encadrant: null,
    diplôme: null,
    grade: null,
    dateInscription: null,
    etablissement: null,
  };
  userRole: string;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('memberId');
    this.userRole = localStorage.getItem('role');
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getFullMemberById(this.currentItemId).then(item => {
        this.item = item;
        this.currentItemDiplome = item.diplôme;
        if (item.photo == null){
          this.imageSrc = "assets/default.png";
        }else {
          this.imageSrc = item.photo;
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.item = null;
    }

  }

  redirectToEdit(id: any): void {
    this.memberService.getMemberById(id).then(
      (res) => {
        if (res.grade != null){
          this.router.navigate([`./members/${Number(id)}/editTeacher`]);
        }else{
          this.router.navigate([`./members/${Number(id)}/editStudent`]);
        }
      }
    ).catch((e) => console.log(e))

  }

  redirectToDashboard(): void {
    this.router.navigate([`./dashboard`]);
  }

  redirectToMembers(): void {
    this.router.navigate([`./members`]);
  }

}
