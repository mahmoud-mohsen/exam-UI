import { ActiveUser } from '../../model/ActiveUser.model';
import { FirebaseService } from './../../service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  activeUser: ActiveUser;
  language: string;
  constructor(public translate: TranslateService, private permissionsService: NgxPermissionsService, private firebaseService: FirebaseService, private router: Router) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {

    if (this.activeUser) {
      const permissions = [String(this.activeUser.type)];
      this.permissionsService.loadPermissions(permissions);
    }

    if (localStorage.getItem('locale')) {
      this.language = localStorage.getItem('locale');

    } else {
      localStorage.setItem('locale', 'en');
    }

  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  OpenUserCourses() {
    this.router.navigate([`user/${this.activeUser.id}/courses`])
  }

  changeLang() {
    localStorage.setItem('locale', this.language);
    this.translate.use(this.language);
  }

  logout() {
    this.firebaseService.logout();
  }
}
