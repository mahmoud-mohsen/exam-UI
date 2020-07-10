import { ParagraphQuestion } from './../../../model/paragraphQuestion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser, type } from './../../../model/ActiveUser.model';
import { GlobalBackEndService } from 'src/app/service/backEnd.service';
import { TrueOrFalseQuestion } from './../../../model/TrueOrFalseQuestion.model';
import { EssayQuestion } from './../../../model/EssayQuestion.model';
import { MCQuestion } from './../../../model/MCQuestion.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() paragraphQuestions: ParagraphQuestion[];
  @Input() totalPoints: Number;

  @Input() examId;

  mcqAnswers: IHash = {};
  tofAnswers: IHash = {};
  essayAnswers: IHash = {};
  paragraphEssayAnswers: IHash = {};
  paragraphMcqAnswers: IHash = {};
  paragraphTrueOrFalseAnswers: IHash = {};

  startSolve;
  finishSolve;
  imageName: String = null;
  examTime;

  @Input() mcqQuestionsTitle: string;
  @Input() trueOrFalseQuestionsTitle: string;
  @Input() essayQuestionsTitle: string;
  @Input() paragraphQuestionsTitle: string;
  @Input() httpRequestExam: boolean;
  @Input() paragraphId: string;
  loading: boolean = true;

  @Input() trueOrFalseAnswers: string[];

  @Output() addTrueOrFAlseAnswerEmmiter = new EventEmitter();
  @Output() addMcqAnswerEmmiter = new EventEmitter();
  @Output() addEssayAnswerEmmiter = new EventEmitter();

  activeUser: ActiveUser;
  constructor(private permissionsService: NgxPermissionsService, private activeRouter: ActivatedRoute, private globalBackEndService: GlobalBackEndService, private router: Router) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.mcqAnswers = {};
    this.tofAnswers = {};
    this.essayAnswers = {};
    this.paragraphEssayAnswers = {};
    this.paragraphMcqAnswers = {};
    this.paragraphTrueOrFalseAnswers = {};
    this.startSolve = new Date();
    this.essayQuestions = new Array();
    this.trueOrFalseQuestions = new Array();
    this.mcQuestions = new Array();
    this.loading = true;
    this.trueOrFalseAnswers = [];
    this.paragraphQuestions = [];
    this.paragraphQuestionsTitle = null;
    this.essayQuestionsTitle = null;
    this.trueOrFalseQuestionsTitle = null;
    this.mcqQuestionsTitle = null;
    this.httpRequestExam = true;
    this.paragraphId = null;

  }

  ngOnInit() {
    this.loading = true;

    const permissions = [String(this.activeUser.type)];
    this.permissionsService.loadPermissions(permissions);
    if (this.httpRequestExam) {
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
    let url = `questions/exam/${this.examId}`;
    this.globalBackEndService.ViewEntity(url, String(this.activeUser.id)).subscribe((response: any) => {

      this.mcQuestions = response.mcqResponses;
      this.trueOrFalseQuestions = response.trueOrFalseResponses;
      this.essayQuestions = response.essayResponses;
      this.paragraphQuestions = response.paragraphResponses;

      this.totalPoints = response.examResponse.totalPoints;
      this.examTime = response.examResponse.examTime;

      this.essayQuestionsTitle = response.examResponse.essayQuestionTitle;
      this.mcqQuestionsTitle = response.examResponse.mcqTitle;
      this.trueOrFalseQuestionsTitle = response.examResponse.trueOrFalseQuestionTitle;
      this.paragraphQuestionsTitle = response.examResponse.paragraphQuestionTitle;

      if (!response || !response.language || response.language == 'ARABIC') {
        this.trueOrFalseAnswers = ['صح', 'خطأ'];
      } else if (response.language == 'FRENCH') {
        this.trueOrFalseAnswers = ['vrais', 'faux'];
      } else if (response.language == 'ENGLISH') {
        this.trueOrFalseAnswers = ['True', 'Fasle'];
      }

    }, (error: any) => {
      alert(error.error.message);
      this.router.navigate([`user/${this.activeUser.id}/courses`]);
    });
  }

  addMcqAnswer(event) {
    let questionId = event.target.name.split(':')[1];
    let choosed = event.target.value;
    this.mcqAnswers[questionId] = choosed;
    this.addMcqAnswerEmmiter.emit({ [this.paragraphId]: this.mcqAnswers });

  }

  addTrueOrFalseAnswer(event) {
    let questionId = event.target.name.split(':')[1];
    let choosed = event.target.value;
    this.tofAnswers[questionId] = choosed;

    this.addTrueOrFAlseAnswerEmmiter.emit({ [this.paragraphId]: this.tofAnswers });

  }

  addEssayAnswer(event) {
    let questionId = event.target.name.split(':')[1];
    let choosed = event.target.value;
    this.essayAnswers[questionId] = choosed;
    this.addEssayAnswerEmmiter.emit({ [this.paragraphId]: this.essayAnswers });
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
      paragraphAnswers: { trueOrFalseAnswers: this.paragraphTrueOrFalseAnswers, mcqAnswers: this.paragraphMcqAnswers, essayAnswers: this.paragraphEssayAnswers },
      endDate: new Date(this.finishSolve).valueOf()
    }
    console.log(seveAnswerRequest);


    this.globalBackEndService.createNewEntity(seveAnswerRequest, url, String(this.activeUser.id)).subscribe(() => {
      alert("You Answers has been submitted");
      this.router.navigate([`user/${this.activeUser.id}/courses`]);
    }, (error: any) => {
      alert(error.error.message);
      this.router.navigate([`user/${this.activeUser.id}/courses`]);
    });

  }

  appendChildTrueOrFalseAnswer(trueOrFalseAnswers: IHash) {

    for (var i in trueOrFalseAnswers)
      this.paragraphTrueOrFalseAnswers[i] = trueOrFalseAnswers[i];

  }

  appendChildMcqAnswer(mcqAnswers: IHash) {
    for (var i in mcqAnswers)
      this.paragraphMcqAnswers[i] = mcqAnswers[i];

  }

  appendChildEssayAnswer(essayAnswers: IHash) {

    for (var i in essayAnswers)
      this.paragraphEssayAnswers[i] = essayAnswers[i];

  }


}
