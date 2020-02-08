import { SignUpRequest } from './../../../model/SignUpRequest.model';
import { Router } from '@angular/router';
import { User, type } from '../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';

@Component({
  selector: 'registerStudent',
  templateUrl: './registerStudent.component.html',
  styleUrls: ['./registerStudent.component.css']
})
export class RegisterStudent implements OnInit {
  signUpRequest: SignUpRequest;
  constructor(private userService: GlobalBackEndService, private router: Router) {
    this.signUpRequest = new SignUpRequest();
  }
  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  createNewStudent() {
    this.signUpRequest.type = type.STUDENT;
    this.userService.signUp(this.signUpRequest).subscribe(
      (data: any) => { this.router.navigate(['login']) }
      , (error: any) => {
        alert(error.error.message);
      });
  }

  openLoginPage() {
    this.router.navigate(['login']);
  }

}
