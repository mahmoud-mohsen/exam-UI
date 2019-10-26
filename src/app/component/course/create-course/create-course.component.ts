import { Course } from './../../../model/Course.model';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { CourseCourse } from 'src/app/model/CreateCourse.model';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseRequest: CourseCourse;
  constructor(private userService: UserService) { }


  ngOnInit() {
    this.courseRequest = new CourseCourse();
  }

  createNewCourse() {
    this.userService.createNewEntity(this.courseRequest, "courses", '2').subscribe((data: Course) => this.courseRequest = { ...data });
  }


}
