import { UserService } from '../../../service/user.service';
import { User, type } from '../../../model/user.model';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'registerStudent',
  templateUrl: './registerStudent.component.html',
  styleUrls: ['./registerStudent.component.css']
})
export class RegisterStudent implements OnInit {

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.user = new User();
  }

  user: User;
  createNewStudent() {
    this.user.type=type.STUDENT;
    this.userService.createNewEntity(this.user,"users",'2').subscribe((data: User) => this.user = {...data});
  }

}
