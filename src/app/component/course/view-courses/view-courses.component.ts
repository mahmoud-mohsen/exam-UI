import { UserService } from './../../../service/user.service';
import { ActiveUser } from '../../../model/ActiveUser.model';
import { Course } from './../../../model/Course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  teacherId;
  courses: Course[];
  activeUser: ActiveUser;
  userId;
  courseCode;
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private globalBackEndService: GlobalBackEndService, private permissionsService: NgxPermissionsService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.courses = new Array();
    this.courseCode = '';

  }

  ngOnInit() {
    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = +params.get('id');
      this.viewTeacherCourses();
    });

  }

  viewTeacherCourses() {
    let url = `userCourses/${this.userId}`
    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id)).subscribe((data: any) => {
      this.courses = data;
      this.courses = this.courses.sort((obj1, obj2) => {
        if (obj1.creationTime < obj2.creationTime) {
          return 1;
        }

        if (obj1.creationTime > obj2.creationTime) {
          return -1;
        }

        return 0;
      });
    });

  }

  enrollStudent(courseId) {
    let url = 'course/enroll';
    let enrollStudentRequest =
    {
      courseId: courseId
      , courseCode: this.courseCode
    }
    this.globalBackEndService.createNewEntity(enrollStudentRequest, url, String(this.activeUser.id)).subscribe(() => {
      window.location.reload();
    }, (error) => {
      alert(error.error.message);
    });
  }

  viewCourseExams(courseId) {
    this.router.navigate([`course/${courseId}/exams`]);
  }

  isUserIsEnrolledInCourse(courseId): boolean {
    return this.userService.IsUserIsEnrolledInCourse(courseId);
  }

  isUserIsPendingEnrolledInCourse(courseId): boolean {
    return this.userService.isUserIsEnrolledInCourseWithStatus(courseId, 'PENDING');
  }

  isUserIsRejectEnrolledInCourse(courseId): boolean {
    return this.userService.isUserIsEnrolledInCourseWithStatus(courseId, 'REJECT');
  }

  isUserIsApproveEnrolledInCourse(courseId): boolean {
    return this.userService.isUserIsEnrolledInCourseWithStatus(courseId, 'APPROVE');
  }
}
