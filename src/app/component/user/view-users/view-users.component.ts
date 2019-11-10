import { ActiveUser } from '../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users:any;
  activeUser:ActiveUser;
  constructor(private userService:GlobalBackEndService,private permissionsService: NgxPermissionsService) {
    this.activeUser= JSON.parse(localStorage.getItem('user'));
    

   }
  ngOnInit() {
    const permissions=[String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);

    this.viewUsers();

    
  }

  viewUsers() {
    
    this.userService.ViewEntities("users",String(this.activeUser.id)).subscribe((data:any) => {
      this.users =data.content;
      console.log(this.users);
      
    });
  }



}
