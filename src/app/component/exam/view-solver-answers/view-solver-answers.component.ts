import { ActiveUser } from './../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-solver-answers',
  templateUrl: './view-solver-answers.component.html',
  styleUrls: ['./view-solver-answers.component.css']
})
export class ViewSolverAnswersComponent implements OnInit {

  activeUser: ActiveUser;
  examId;
  solverId;

  mcQuestionsAnswers: [];
  trueOrFalseQuestionsAnswers: [];
  essayQuestionsAnswers: [];
  paragraphQuestionAnswers:[] ;
  totalPoints;

  constructor(private router: Router, private globalBackEndService: GlobalBackEndService, private activatedRoute: ActivatedRoute) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.examId = +params.get('examId');
      this.solverId = +params.get('solverId');

      this.getSolverAnswers();
    });
  }

  getSolverAnswers() {
    let url = `exam/${this.examId}/solver/${this.solverId}`
    this.globalBackEndService.ViewEntities(url, String(this.activeUser.id)).subscribe((response: any) => {
      this.essayQuestionsAnswers = response.essayWithAnswerResponses;
      this.mcQuestionsAnswers = response.mcqWithAnswerResponses;
      this.trueOrFalseQuestionsAnswers = response.trueOrFalseWithAnswerResponses;
      this.paragraphQuestionAnswers=response.paragraphWithAnswerResponses;
      this.totalPoints = response.score


    }, (error: any) => {
      alert(error.error.message);
      this.router.navigate([`exam/${this.examId}/questions`]);
    })
  }
  savePoint(question, point) {
    let url = `question/${question.id}/score`;

    let entity = { studentId: `${this.solverId}`, examId: `${this.examId}`, point: point };
    this.globalBackEndService.createNewEntity(entity, url, String(this.activeUser.id)).subscribe(() => {
      this.getSolverAnswers()
        },
      (error: any) => {
        alert(error.error.message);
      });
  }
}