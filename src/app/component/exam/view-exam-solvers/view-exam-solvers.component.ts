import { Router } from '@angular/router';
import { ExamSolver } from './../../../model/ExamSolver.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { ActiveUser } from './../../../model/ActiveUser.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-exam-solvers',
  templateUrl: './view-exam-solvers.component.html',
  styleUrls: ['./view-exam-solvers.component.css']
})
export class ViewExamSolversComponent implements OnInit {

  activeUser: ActiveUser;
  examSolvers: ExamSolver[];
  hideSolverTable;
  @Input() examId;
  constructor(private router: Router, private globalBackEndService: GlobalBackEndService) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {
    if (this.router.url.indexOf('newExam') == -1) {
      this.getExamSolvers();
    }else{
      this.hideSolverTable=true;      
    }
  }

  getExamSolvers() {
    let url = `exam/${this.examId}/solve/users`
    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id)).subscribe((response: any) => {
      this.examSolvers = response
    }, (error: any) => {
      alert(error.error.message);
    })
  }

  viewUserAnswer(userId) {
    this.router.navigate([`exam/${this.examId}/solver/${userId}`]);
  }

}
