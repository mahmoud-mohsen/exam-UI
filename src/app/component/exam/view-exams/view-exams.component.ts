import { UserService } from './../../../service/user.service';
import { Exam } from './../../../model/Exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser } from '../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {

  activeUser: ActiveUser;
  courseId;
  exams: Exam[]
  constructor(private router: Router, private userService: UserService, private globalBackEndService: GlobalBackEndService, private activeRouter: ActivatedRoute, private permissionsService: NgxPermissionsService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.exams = new Array();

  }

  ngOnInit() {
    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);
    this.activeRouter.paramMap.subscribe(params => {
      this.courseId = +params.get('id');
      this.viewCourseExam();

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
    this.router.navigate([`/exam/${examId}/questions`]);
  }

}
