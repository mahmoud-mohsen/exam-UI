import { ParagraphQuestion } from './../../../model/paragraphQuestion.model';
import { ActiveUser } from './../../../model/ActiveUser.model';
import { GlobalBackEndService } from './../../../service/backEnd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MCQuestion } from './../../../model/MCQuestion.model';
import { EssayQuestion } from './../../../model/EssayQuestion.model';
import { TrueOrFalseQuestion } from './../../../model/TrueOrFalseQuestion.model';
import { CreateExamRequest } from './../../../model/CreateExam.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  createExamRequest: CreateExamRequest;
  trueOrFalseForm: boolean = true;
  mCQForm: boolean = false;
  essayForm: boolean = false;
  paragraphForm: boolean = false;
  trueOrFalseQ: TrueOrFalseQuestion;
  paragraphQ: ParagraphQuestion;
  essayQ: EssayQuestion;
  mCQ: MCQuestion;
  totalPoints: Number;
  courseId;
  activeUser: ActiveUser;
  timeUnit: string;
  examTime: Number;
  examStartDate: string;
  examEndDate: string;
  imageName: String = null;


  constructor(private activeRouter: ActivatedRoute, private globalBackEndService: GlobalBackEndService, private router: Router) {
    this.trueOrFalseForm = true;
    this.mCQForm = false;
    this.essayForm = false;
    this.paragraphForm = false;
    this.createExamRequest = new CreateExamRequest();
    this.essayQ = new EssayQuestion();
    this.paragraphQ = new ParagraphQuestion();
    this.trueOrFalseQ = new TrueOrFalseQuestion();
    this.mCQ = new MCQuestion();
    this.totalPoints = 0;
    this.activeUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {

    this.trueOrFalseForm = true;
    this.mCQForm = false;
    this.essayForm = false;
    this.activeRouter.paramMap.subscribe(params => {
      this.courseId = +params.get('id');
    });
  }

  viewTrueOrFalseForm() {
    this.trueOrFalseForm = true;
    this.mCQForm = false;
    this.essayForm = false;
    this.paragraphForm = false;
  }

  viewEssayForm() {
    this.trueOrFalseForm = false;
    this.mCQForm = false;
    this.essayForm = true;
    this.paragraphForm = false;
  }

  viewMCQForm() {
    this.trueOrFalseForm = false;
    this.mCQForm = true;
    this.essayForm = false;
    this.paragraphForm = false;
  }

  viewParagrappForm() {
    this.trueOrFalseForm = false;
    this.mCQForm = false;
    this.essayForm = false;
    this.paragraphForm = true;
  }

  addTrueOrFalseQuestion() {
    this.createExamRequest.trueOrFalseQuestion.push(this.trueOrFalseQ);
    this.totalPoints = Number(this.totalPoints) + Number(this.trueOrFalseQ.size);
    this.trueOrFalseQ = new TrueOrFalseQuestion();

  }
  addMCQQuestion() {
    this.createExamRequest.mcQuestion.push(this.mCQ);
    this.totalPoints = Number(this.totalPoints) + Number(this.mCQ.size);
    this.mCQ = new MCQuestion();
  }

  addEssayQuestion() {
    this.createExamRequest.essayQuestion.push(this.essayQ);
    this.totalPoints = Number(this.totalPoints) + Number(this.essayQ.size);
    this.essayQ = new EssayQuestion();
    this.imageName = null;
  }

  addParagraphQuestion() {
    let paragraphSize = 0;
    for (let index = 0; index < this.paragraphQ.trueOrFalseQuestion.length; index++) {
      paragraphSize += Number(this.paragraphQ.trueOrFalseQuestion[index].size);
    }

    for (let index = 0; index < this.paragraphQ.mcQuestion.length; index++) {
      paragraphSize += Number(this.paragraphQ.mcQuestion[index].size);
    }

    for (let index = 0; index < this.paragraphQ.essayQuestion.length; index++) {
      paragraphSize += Number(this.paragraphQ.essayQuestion[index].size);
    }

    this.paragraphQ.size = paragraphSize;

    this.createExamRequest.paragraphQuestions.push(this.paragraphQ);


    this.totalPoints = Number(this.totalPoints) + Number(this.paragraphQ.size);
    this.paragraphQ = new ParagraphQuestion();

  }

  createNewExam() {

    let url = `exams/course/${this.courseId}`;
    this.createExamRequest.totalPoints = this.totalPoints;
    if (this.examStartDate > this.examEndDate) {
      alert('Start Date must not be greater than long date');
      return;
    }
    this.createExamRequest.startDate = new Date(this.examStartDate).valueOf();
    this.createExamRequest.endDate = new Date(this.examEndDate).valueOf();
    this.createExamRequest.examTime = Number(this.examTime) * Number(this.timeUnit);

    this.globalBackEndService.createNewEntity(this.createExamRequest, url, String(this.activeUser.id)).subscribe((response: any) => {
      this.router.navigate([`course/${this.courseId}/exams`]);
    });

  }

  prepareImage(image) {
    var file: File = image.files[0];
    this.imageName = file.name;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.essayQ.questionsAsImage = myReader.result;
    }
    myReader.readAsDataURL(file);

  }

}
