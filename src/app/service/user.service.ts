import { Course } from './../model/Course.model';
import { ActiveUser } from './../model/ActiveUser.model';
import { User } from './../model/user.model';
import { GlobalBackEndService } from './backEnd.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUserDetails: User;
  activeUser: ActiveUser;

  constructor(private globalBackEndService: GlobalBackEndService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

    if (this.activeUser) {
      this.getLoggedInUserDetails();
    }
  }

  public getLoggedInUserDetails(callback?: () => void) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    let url = `user/${this.activeUser.id}`;
    this.globalBackEndService.ViewEntity(url, String(this.activeUser.id)).subscribe((response: any) => {
      this.loggedInUserDetails = response;

      if (callback) {
        callback();
      }
    });

  }

  public IsCourseCreatedByUser(CourseId) {

    if (this.loggedInUserDetails) {
      return this.checkCourseInUserCreatedCourses(CourseId)
    } else {
      this.getLoggedInUserDetails(() => {
        return this.checkCourseInUserCreatedCourses(CourseId);
      })
    }
    return false;
  }

  private checkCourseInUserCreatedCourses(CourseId) {

    if (this.loggedInUserDetails.createdCourses) {
      for (let index = 0; index < this.loggedInUserDetails.createdCourses.length; index++) {
        if (this.loggedInUserDetails.createdCourses[index].id == CourseId) {
          return true;
        }
      }
    }
    return false;
  }

  public IsUserIsEnrolledInCourse(CourseId) {
    if (this.loggedInUserDetails.id) {
      return this.checkUserIsEnrolledInCourse(CourseId)
    } else {
      this.getLoggedInUserDetails(() => {
        return this.checkUserIsEnrolledInCourse(CourseId);
      })
    }
    return false;
  }

  private checkUserIsEnrolledInCourse(CourseId) {
    if (this.loggedInUserDetails.enrollCourse) {
      for (let index = 0; index < this.loggedInUserDetails.enrollCourse.length; index++) {
        if (this.loggedInUserDetails.enrollCourse[index].courseId == CourseId) {
          return true;
        }
      }
    }
    return false;
  }


  isUserIsEnrolledInCourseWithStatus(CourseId, status) {

    if (this.loggedInUserDetails.enrollCourse) {

      for (let index = 0; index < this.loggedInUserDetails.enrollCourse.length; index++) {
        if (this.loggedInUserDetails.enrollCourse[index].status == status && this.loggedInUserDetails.enrollCourse[index].courseId == CourseId) {
          return true;
        }
      }
    }
    return false;
  }
}
