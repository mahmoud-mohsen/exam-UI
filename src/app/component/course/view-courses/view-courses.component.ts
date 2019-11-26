import { User, type } from './../../../model/user.model';
import { CourseUpdateDetails } from './../../../model/CourseUpdateDetails.model';
import { UpdateCourseComponent } from './../update-course/update-course.component';
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
  updateCourseView: boolean;
  courseUpdateDetails: CourseUpdateDetails;
  courseIdToUpdate;
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private globalBackEndService: GlobalBackEndService, private permissionsService: NgxPermissionsService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.courses = new Array();
    this.updateCourseView = false;
    this.courseCode = '';
    this.courseUpdateDetails = new CourseUpdateDetails();

  }

  ngOnInit() {
    this.updateCourseView = false;

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

  isUserTheCreator(courseId): boolean {
    return this.userService.IsCourseCreatedByUser(courseId);
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

  viewUpdateCourseForm(c: Course) {

    this.updateCourseView = true;

    this.courseIdToUpdate = c.id;
    this.courseUpdateDetails.title = c.title;
    this.courseUpdateDetails.code = c.code;
    this.courseUpdateDetails.level = c.level;
  }
  CloseUpdaetForm() {
    this.updateCourseView = false;

  }

  deleteCourse(courseId) {
    let url = `course/${courseId}`;
    this.globalBackEndService.deleteEntity(url, String(this.activeUser.id)).subscribe(() => {
      window.location.href = window.location.pathname;
    }, (error: any) => {
      alert(error.error.message);
    });
  }

  viewViewButton(couresId): boolean {
    return ((this.isUserIsEnrolledInCourse(couresId) && this.isUserIsApproveEnrolledInCourse(couresId)) && !(String(this.activeUser.type) == type[type.TEACHER]))
      || ((this.isUserTheCreator(couresId) && (String(this.activeUser.type) == type[type.TEACHER])))
  }
}
