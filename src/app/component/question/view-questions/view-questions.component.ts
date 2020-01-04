import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser, type } from './../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { TrueOrFalseQuestion } from './../../../model/TrueOrFalseQuestion.model';
import { EssayQuestion } from './../../../model/EssayQuestion.model';
import { MCQuestion } from './../../../model/MCQuestion.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

export interface IHash {
  [details: string]: string;
}

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
  mcqAnswers: IHash = {};
  tofAnswers: IHash = {};
  essayAnswers: IHash = {}
  startSolve;
  finishSolve;
  imageName: String = null;
  examTime;

  mcqQuestionsTitle;
  trueOrFalseQuestionsTitle;
  essayQuestionsTitle;
  loading: boolean = true;

  trueOrFalseAnswers: string[];



  activeUser: ActiveUser;
  constructor(private permissionsService: NgxPermissionsService, private activeRouter: ActivatedRoute, private globalBackEndService: GlobalBackEndService, private router: Router) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.mcqAnswers = {};
    this.tofAnswers = {};
    this.essayAnswers = {};
    this.startSolve = new Date();
    this.essayQuestions = new Array();
    this.trueOrFalseQuestions = new Array();
    this.mcQuestions = new Array();
    this.loading = true;
    this.trueOrFalseAnswers=[];

  }

  ngOnInit() {
    this.loading = true;

    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);

    if (this.router.url.indexOf('newExam') == -1) {
      this.activeRouter.paramMap.subscribe(params => {
        this.examId = +params.get('id');
        this.viewExamsWithQuestions();

        this.loading = false;
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

      this.mcQuestions = response.mcqResponses;
      this.trueOrFalseQuestions = response.trueOrFalseResponses;
      this.essayQuestions = response.essayResponses;
      this.totalPoints = response.examResponse.totalPoints;
      this.examTime = response.examResponse.examTime;
      this.essayQuestionsTitle = response.examResponse.essayQuestionTitle;
      this.mcqQuestionsTitle = response.examResponse.mcqTitle;
      this.trueOrFalseQuestionsTitle = response.examResponse.trueOrFalseQuestionTitle;

      if (!response || !response.language || response.language == 'ARABIC') {
        this.trueOrFalseAnswers = ['صح', 'خطأ'];
      } else if (response.language == 'FRENCH') {
        this.trueOrFalseAnswers = ['vrais', 'faux'];
      } else if (response.language == 'ENGLISH') {
        this.trueOrFalseAnswers = ['True', 'Fasle'];
      }
      console.log(this.trueOrFalseAnswers);
      
    }, (error: any) => {
      alert(error.error.message);
      this.router.navigate([`user/${this.activeUser.id}/courses`]);
    });
  }

  addmMcqAnswer(event) {
    let questionId = event.target.name.split(':')[1];
    let choosed = event.target.value;
    this.mcqAnswers[questionId] = choosed;
  }

  addmTrueOrFalseAnswer(event) {
    let questionId = event.target.name.split(':')[1];
    let choosed = event.target.value;
    this.tofAnswers[questionId] = choosed;
  }

  addEssayAnswer(event) {
    let questionId = event.target.name.split(':')[1];
    let choosed = event.target.value;
    this.essayAnswers[questionId] = choosed;
  }

  addEssayAnswerAsImage(event) {
    var file: File = event.target.files[0];
    this.imageName = file.name;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      let questionId = event.target.name.split(':')[1];
      let choosed = myReader.result;
      this.essayAnswers[questionId] = String(choosed);
    }
    myReader.readAsDataURL(file);
  }
  submitAnswers() {

    let url = `exam/${this.examId}/solve`;

    this.finishSolve = new Date();
    let seveAnswerRequest = {
      mcqAnswers: this.mcqAnswers,
      trueOrFalseAnswers: this.tofAnswers,
      essayAnswers: this.essayAnswers,
      endDate: new Date(this.finishSolve).valueOf()
    }

    this.globalBackEndService.createNewEntity(seveAnswerRequest, url, String(this.activeUser.id)).subscribe(() => {
      alert("You Answers has been submitted");
      this.router.navigate([`user/${this.activeUser.id}/courses`]);
    }, (error: any) => {
      alert(error.error.message);
      this.router.navigate([`user/${this.activeUser.id}/courses`]);
    });

  }


}
