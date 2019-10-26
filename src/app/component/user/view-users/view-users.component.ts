import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users:any;

  constructor(private userService:UserService) {
    this.viewUsers();

   }
  ngOnInit() {
    this.viewUsers();

  }

  viewUsers() {
    this.userService.ViewEntities("users","2").subscribe((data: any) => this.users = {...data});
  }



}
