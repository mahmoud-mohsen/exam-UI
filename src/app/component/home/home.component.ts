import { NgxPermissionsService } from 'ngx-permissions';
import { type } from 'src/app/model/user.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { ActiveUser } from './../../model/ActiveUser.model';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion,{static: true}) accordion: MatAccordion;

  activeUser: ActiveUser;
  constructor(private permissionsService: NgxPermissionsService, private globalBackEndService: GlobalBackEndService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));



  }

  ngOnInit() {
    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);

    if (this.activeUser.type.toString() == type[type.TEACHER]) {
      this.getUserDashboard(this.activeUser.id);
    }

  }

  getUserDashboard(userId) {
    let url = `user/dashboard/${userId}`;
    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id)).subscribe((response: any) => {
      console.log(response);

    }, (error: any) => {
      alert(error.error.message);
    })
  }
}
