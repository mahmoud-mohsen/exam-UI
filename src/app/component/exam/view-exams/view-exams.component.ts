import { ExamUpdateDetails } from './../../../model/ExamUpdateDetails.model';
import { UserService } from './../../../service/user.service';
import { Exam } from './../../../model/Exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser } from '../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { type } from 'src/app/model/user.model';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {

  activeUser: ActiveUser;
  courseId;
  exams: Exam[];
  examUpdateDetails: ExamUpdateDetails;
  examIdToUpdate;
  viewUpdateExamForm: boolean;
  examCode;


  constructor(private router: Router, private userService: UserService, private globalBackEndService: GlobalBackEndService, private activeRouter: ActivatedRoute, private permissionsService: NgxPermissionsService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.exams = new Array();
    this.examUpdateDetails = new ExamUpdateDetails();
    this.viewUpdateExamForm = false;


  }

  ngOnInit() {
    this.viewUpdateExamForm = false;
    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);
    this.activeRouter.paramMap.subscribe(params => {
      this.courseId = +params.get('id');
      this.viewCourseExam();

    });
  }

  publishExam(examId) {
    let url = `exam/${examId}/publish`;
    this.globalBackEndService.putEntity(null, url, String(this.activeUser.id)).subscribe(() => {
      window.location.reload();
    }, (error: any) => {
      alert(error.error.message);

    });

  }

  viewCourseExam() {

    let url = `course/${this.courseId}/exams`;

    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id)).subscribe((resonse: any) => {

      this.exams = resonse;
      this.exams = this.exams.sort((obj1, obj2) => {
        if (obj1.creationTime < obj2.creationTime) {
          return 1;
        }

        if (obj1.creationTime > obj2.creationTime) {
          return -1;
        }

        return 0;
      });

    }, (error: any) => {
      alert(error.error.message);

    });
  }

  isCourseOwner() {
    return this.userService.IsCourseCreatedByUser(this.courseId);
  }

  viewQuestionExamPage(examId) {

    if (String(this.activeUser.type) == 'TEACHER') {
      this.router.navigate([`/exam/${examId}/questions`]);
    } else {
      let url = `exam/${examId}/solve/setup`;
      let entity = { examCode: this.examCode }

      this.globalBackEndService.createNewEntity(entity, url, String(this.activeUser.id)).subscribe(() => {
        this.router.navigate([`/exam/${examId}/questions`]);
      }, (error: any) => {
        alert(error.error.message);
      });
    }

  }

  CloseUpdateForm() {
    this.viewUpdateExamForm = false;

  }
  updateExamView(exam: Exam) {
    this.viewUpdateExamForm = true;

    this.examIdToUpdate = exam.id;

    this.examUpdateDetails.examTime = exam.examTime;
    this.examUpdateDetails.title = exam.title;
    this.examUpdateDetails.code = exam.code;
    this.examUpdateDetails.note = exam.note;
    this.examUpdateDetails.toDate = exam.toDate;
    this.examUpdateDetails.fromDate = exam.fromDate;


  }

  getExamTimeInMinutes(period): Number {
    return Number(period) / 60;
  }

  deleteExam(examId) {
    let url = `exam/${examId}`;
    this.globalBackEndService.deleteEntity(url, String(this.activeUser.id)).subscribe(() => {
      window.location.reload();
    }, (error: any) => {
      alert(error.error.message);
    });
  }

  openAddExamPage(courseId) {
    this.router.navigate(['course', courseId, 'newExam']);
  }
}
