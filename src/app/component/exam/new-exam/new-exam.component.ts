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
  trueOrFalseQ: TrueOrFalseQuestion;
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
    this.createExamRequest = new CreateExamRequest();
    this.essayQ = new EssayQuestion();
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
  }

  viewEssayForm() {
    this.trueOrFalseForm = false;
    this.mCQForm = false;
    this.essayForm = true;
  }

  viewMCQForm() {
    this.trueOrFalseForm = false;
    this.mCQForm = true;
    this.essayForm = false;
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

  createNewExam() {

    let url = `course/${this.courseId}/exams`;
    this.createExamRequest.totalPoints = this.totalPoints;
    if (this.examStartDate > this.examEndDate) {
      alert('Start Date must not be greater than long date');
      return;
    }
    this.createExamRequest.startDate = new Date(this.examStartDate).valueOf();
    this.createExamRequest.endDate = new Date(this.examEndDate).valueOf();
    this.createExamRequest.examTime = Number(this.examTime) * Number(this.timeUnit);
    console.log(this.createExamRequest);
    
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
