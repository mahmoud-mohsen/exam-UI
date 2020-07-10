import { ActiveUser } from './../../../model/ActiveUser.model';
import { GlobalBackEndService } from './../../../service/backEnd.service';
import { Component, OnInit } from '@angular/core';
import { StudentExamHistory } from 'src/app/model/StudentExamHistory.model';

@Component({
  selector: 'app-view-exam-history',
  templateUrl: './view-exam-history.component.html',
  styleUrls: ['./view-exam-history.component.css']
})
export class ViewExamHistoryComponent implements OnInit {

  activeUser: ActiveUser;
  studentExamHistory: StudentExamHistory[];
  constructor(private globalBackEndService: GlobalBackEndService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.viewStudentExamHistory();
  }

  viewStudentExamHistory() {

    let url = `exam/history`;

    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id)).subscribe((resonse: any) => {

      this.studentExamHistory = resonse;
      this.studentExamHistory = this.studentExamHistory.sort((obj1, obj2) => {
        if (obj1.solvedDate < obj2.solvedDate) {
          return 1;
        }

        if (obj1.solvedDate > obj2.solvedDate) {
          return -1;
        }

        return 0;
      });

    }, (error: any) => {
      alert(error.error.message);

    });
  }
}
