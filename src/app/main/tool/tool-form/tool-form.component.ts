import { Component, OnInit } from '@angular/core';
import {Evenement} from '../../../../models/evenement.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolService} from '../../../../services/tool.service';
import {Tool} from '../../../../models/tool.model';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {

  userType: String = null;
  userId: String = null;

  currentItemId: string;
  item: Tool;
  form: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private toolService: ToolService) { }

  ngOnInit(): void {
    this.loadMember();
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
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
  initForm(item: Tool) {
    this.form = new FormGroup({

      source: new FormControl(item?.source, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
    });
  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

   onSubmit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    const objectToSubmit: Tool = {...this.item, ...this.form.value};
    if (!!this.currentItemId) {
      this.toolService.updateTool(objectToSubmit).then(() => this.router.navigate(['./tools'])).catch((error) => {
        console.log(error);
      });
    } else {
      this.toolService.createTool(objectToSubmit).then((data) => {
        if (this.userId){
          this.toolService.addUserToTool(Number(this.userId), Number(data.id)).then((data) => {
            this.router.navigate(['./tools']);
          }).catch((error) => {
            console.log(error);
          });
        }else {
          this.router.navigate(['./tools']);
        }
      }).catch((error) => {
        console.log(error);
      });
    }

  }

  loadMember(): void{
    this.userType = localStorage.getItem('role');
    this.userId = localStorage.getItem('memberId');
    console.log("userId: "+this.userId)
  }

}
