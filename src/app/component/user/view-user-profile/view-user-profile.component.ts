import { UserService } from './../../../service/user.service';
import { User } from './../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {
  userId;
  user:User;
  constructor(private route: ActivatedRoute,private userService:UserService) {
   this.user=new User();
  }

ngOnInit() {
this.route.paramMap.subscribe(params =>{  
  this.userId=+params.get('id');
  this.viewUserProfile();
});
}

viewUserProfile(){
  this.userService.ViewEntity("user",this.userId,'2').subscribe((data: any) => this.user = {...data});  
}
}
