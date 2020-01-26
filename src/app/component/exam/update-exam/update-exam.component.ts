import { ExamUpdateDetails } from './../../../model/ExamUpdateDetails.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { CourseUpdateDetails } from './../../../model/CourseUpdateDetails.model';
import { ActiveUser } from './../../../model/ActiveUser.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent implements OnInit {

  @Input() examUpdateDetails: ExamUpdateDetails;
  activeUser: ActiveUser;
  @Input() examIdToUpdate;
  @Output() close = new EventEmitter();

  fromDate: string;
  toDate: string;
  timeUnit: string;
  examTime: Number;


  constructor(private globalBackEndService: GlobalBackEndService) {
    this.examUpdateDetails = new ExamUpdateDetails();

    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {
  }
  CloseUpdateView() {
    this.close.emit();
  }
  updateExam() {

    if (this.toDate) {
      this.examUpdateDetails.toDate = new Date(this.toDate).valueOf();
    } if (this.fromDate) {
      this.examUpdateDetails.fromDate = new Date(this.fromDate).valueOf();
    }
    if (this.examTime) {
      this.examUpdateDetails.examTime = Number(this.examTime) * Number(this.timeUnit);
    }
    if (this.examUpdateDetails.fromDate > this.examUpdateDetails.toDate) {
      alert('Start Date must not be greater than long date');
      return;
    }

    let url = `exam/${this.examIdToUpdate}`;
    this.globalBackEndService.putEntity(this.examUpdateDetails, url, String(this.activeUser.id)).subscribe(() => {
      window.location.reload();
    }, (error: any) => {
      alert(error.error.message);
    })
  }

  getExamTimeInMinutes(): Number {
    return Number(this.examUpdateDetails.examTime) / 60;
  }

}
