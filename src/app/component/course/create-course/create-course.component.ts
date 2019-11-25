import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser } from '../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { Course } from './../../../model/Course.model';
import { Component, OnInit } from '@angular/core';
import { CourseCourse } from 'src/app/model/CreateCourse.model';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseRequest: CourseCourse;
  activeUser: ActiveUser;
  course: Course;
  constructor(private router: Router, private userService: GlobalBackEndService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }


  ngOnInit() {
    this.courseRequest = new CourseCourse();
  }

  createNewCourse() {

    this.userService.createNewEntity(this.courseRequest, "courses", String(this.activeUser.id)).subscribe((data: any) => {
      this.course = { ...data };
      window.location.href = `user/${this.activeUser.id}/courses`;

    });
  }


}
