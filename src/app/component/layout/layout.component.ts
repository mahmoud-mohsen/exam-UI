import { FirebaseService } from './../../service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: any;
  constructor(private firebaseService:FirebaseService,private router:Router) {
    this.user = JSON.parse(localStorage.getItem('user'));    
  }

  ngOnInit() {
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  logout(){
    this.firebaseService.logout();
    this.router.navigate(['login']);

  }
}
