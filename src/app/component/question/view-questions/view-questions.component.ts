import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser } from './../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { TrueOrFalseQuestion } from './../../../model/TrueOrFalseQuestion.model';
import { EssayQuestion } from './../../../model/EssayQuestion.model';
import { MCQuestion } from './../../../model/MCQuestion.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  @Input() mcQuestions: MCQuestion[];
  @Input() essayQuestions: EssayQuestion[];
  @Input() trueOrFalseQuestions: TrueOrFalseQuestion[];
  @Input() totalPoints: Number;
  @Input() isSavedQuestions: boolean;
  examId;


  activeUser: ActiveUser;
  constructor(private activeRouter: ActivatedRoute, private globalBackEndService: GlobalBackEndService, private router: Router) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));


  }

  ngOnInit() {
    if (this.router.url.indexOf('newExam') == -1) {
      this.activeRouter.paramMap.subscribe(params => {
        this.examId = +params.get('id');
        this.viewExamsWithQuestions();
      });

    }

  }

  deleteMCQQuestion(mcQ) {
    const index: number = this.mcQuestions.indexOf(mcQ);
    if (index !== -1) {
      this.mcQuestions.splice(index, 1);
      this.totalPoints = Number(this.totalPoints) - Number(mcQ.size);
    }
  }
  deleteTOFQuestion(tofQ) {
    const index: number = this.trueOrFalseQuestions.indexOf(tofQ);
    if (index !== -1) {
      this.trueOrFalseQuestions.splice(index, 1);
      this.totalPoints = Number(this.totalPoints) - Number(tofQ.size);

    }
  }
  deleteEssayQuestion(essayQ) {
    const index: number = this.essayQuestions.indexOf(essayQ);
    if (index !== -1) {
      this.essayQuestions.splice(index, 1);
      this.totalPoints = Number(this.totalPoints) - Number(essayQ.size);

    }
  }

  viewExamsWithQuestions() {
    let url = `exam/${this.examId}/questions`;
    this.globalBackEndService.ViewEntity(url, String(this.activeUser.id)).subscribe((response: any) => {
      console.log(response);

      this.mcQuestions = response.mcqResponses;
      this.trueOrFalseQuestions = response.trueOrFalseResponses;
      this.essayQuestions = response.essayResponses;
      this.totalPoints=response.examResponse.totalPoints;
    });
  }

}
