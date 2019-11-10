import { FirebaseService } from './../../../service/firebase.service';
import { ActiveUser } from '../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
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
  activeUser: ActiveUser;
  user: User;
  constructor(private route: ActivatedRoute, private userService: GlobalBackEndService) {
    this.user = new User();
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id');
      this.viewUserProfile();
    });
  }

  viewUserProfile() {
    console.log(this.activeUser.id);
    let url = `user/${this.userId}`;
    
    this.userService.ViewEntity(url, String(this.activeUser.id)).subscribe((data: any) => {
      this.user = data
    },
      (error: any) => {
        alert(error.error.message);
      });
  }
}
