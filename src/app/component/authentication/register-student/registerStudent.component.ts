import { User, type } from '../../../model/user.model';
import { Component, OnInit} from '@angular/core';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';

@Component({
  selector: 'registerStudent',
  templateUrl: './registerStudent.component.html',
  styleUrls: ['./registerStudent.component.css']
})
export class RegisterStudent implements OnInit {

  constructor(private userService: GlobalBackEndService) {

  }
  ngOnInit() {
    this.user = new User();
  }

  user: User;
  createNewStudent() {
    this.user.type=type.STUDENT;
    this.userService.createNewEntity(this.user,"users",'2').subscribe((data:any) => this.user = {...data});
  }

}
