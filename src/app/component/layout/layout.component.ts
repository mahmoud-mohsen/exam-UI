import { ActiveUser } from '../../model/ActiveUser.model';
import { FirebaseService } from './../../service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  activeUser: ActiveUser;
  constructor(private permissionsService: NgxPermissionsService, private firebaseService: FirebaseService, private router: Router) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {

    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);

  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  OpenUserCourses() {
    this.router.navigate([`user/${this.activeUser.id}/courses`])
  }

  logout() {
    this.firebaseService.logout();
  }
}
