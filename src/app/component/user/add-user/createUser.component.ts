import { UserService } from '../../../service/user.service';
import { User, type } from '../../../model/user.model';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'createUser',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css']
})
export class CreateUser implements OnInit {

  constructor(private userService: UserService,private router:Router) {

  }
  ngOnInit() {
    this.user = new User();
  }

  user: User;
  createNewUser() {
    this.userService.createNewEntity(this.user,"users",'1').subscribe((data: User) => {
      this.user = {...data};
      this.router.navigate(['userProfile',this.user.id]);
    });
  }

}
