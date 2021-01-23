import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  userexist: any;
  username: string;
  memberId:String;
  memberType:String;

  constructor(private loginservice: LoginService,
              private memberService: MemberService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginservice.layoutEvent.subscribe(response => {
      this.loadMember(); });
    console.log(this.userexist);
    this.loadMember();
  }

  logout(): void{
    this.loginservice.logout();
    this.userexist = null;
    this.memberId = null;
    this.username = null;
    this.memberType = null;
    this.router.navigate(['./login']);
  }

  loadMember(): void{
    this.userexist = localStorage.getItem('user');
    this.memberId = localStorage.getItem('memberId');
    this.memberType = localStorage.getItem('role');
    if (this.userexist){
      this.memberService.getMemberbyEMAIL(this.userexist).then(data => {
        this.memberId = data?.id;
        if (this.memberType == "ROLE_ADMIN"){
          this.username = "ADMIN";
        }else {
          this.username = data?.nom + ' ' + data?.prenom;
        }
      }).catch((e) => console.log(e));
    }
  }
}
