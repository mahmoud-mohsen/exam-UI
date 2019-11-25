import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { ActiveUser } from './../../../model/ActiveUser.model';
import { CourseUpdateDetails } from './../../../model/CourseUpdateDetails.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  @Input() courseUpdateDetails: CourseUpdateDetails;
  activeUser: ActiveUser;
  @Input() courseIdToUpdate;
  @Output() close = new EventEmitter();

  constructor(private globalBackEndService: GlobalBackEndService) {
    this.courseUpdateDetails = new CourseUpdateDetails();

    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {
  }
  CloseUpdateView() {
    this.close.emit();
  }
  updateCourse() {
    let url = `course/${this.courseIdToUpdate}`;
    this.globalBackEndService.putEntity(this.courseUpdateDetails, url, String(this.activeUser.id)).subscribe(() => {      
      window.location.href=window.location.pathname;
    }, (error: any) => {
      alert(error.error.message);
    })
  }


}
