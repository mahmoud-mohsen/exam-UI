import { UserService } from './../../../service/user.service';
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
  constructor(private router: Router, private globalBackEndService: GlobalBackEndService,private userService:UserService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }


  ngOnInit() {
    this.courseRequest = new CourseCourse();

  }

  createNewCourse() {

    this.globalBackEndService.createNewEntity(this.courseRequest, "courses", String(this.activeUser.id)).subscribe((data: any) => {
      this.course = { ...data };
      console.log(this.course);

      console.log(this.userService.loggedInUserDetails.createdCourses);
      
      this.userService.loggedInUserDetails.createdCourses.push(this.course);
      console.log(this.userService.loggedInUserDetails.createdCourses);

      this.router.navigate(['user', `${this.activeUser.id}`, 'courses']);
      
    },(error: any) => {
      alert(error.error.message);
    });
  }


}
