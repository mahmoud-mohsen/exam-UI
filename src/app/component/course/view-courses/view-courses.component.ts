import { User } from './../../../model/user.model';
import { Course } from './../../../model/Course.model';
import { UserService } from './../../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  teacherId;
  courses: Course[];
  user:User;
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user=new User();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.teacherId = +params.get('id');
      this.viewTeacherCourses();
      console.log(this.courses);

    });

  }

  viewTeacherCourses() {
    this.userService.ViewEntity("user", this.teacherId, '2').subscribe((data: any) => this.user = { ...data });
    this.courses=this.user.createdCourses;

  }
}
