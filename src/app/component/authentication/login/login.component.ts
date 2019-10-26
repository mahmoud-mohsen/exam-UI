import { Route, Router } from '@angular/router';
import { FirebaseService } from './../../../service/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private firebaseService: FirebaseService,private router:Router) { 
    this.firebaseService.isLogin().subscribe(user => {
      if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['']);
      }
  });

    this.email='';
    this.password='';
  }

  ngOnInit() {
  }
  login() {
    
    this.firebaseService.login(this.email, this.password);
  }
}
