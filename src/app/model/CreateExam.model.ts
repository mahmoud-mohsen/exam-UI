import { ParagraphQuestion } from './paragraphQuestion.model';
import { Course } from './Course.model';
import { MCQuestion } from './MCQuestion.model';
import { EssayQuestion } from './EssayQuestion.model';
import { TrueOrFalseQuestion } from './TrueOrFalseQuestion.model';
export enum type { TEACHER, STUDENT, ADMIN }
export class CreateExamRequest {

  code: String;

  title: String;

  note: String;

  startDate: Number;

  examTime: number;

  endDate: Number;

  mcqTitle: String;

  trueOrFalseQuestionTitle: String;

  essayQuestionTitle: String;

  paragraphQuestionTitle: String;

  totalPoints: Number;
  trueOrFalseQuestion: TrueOrFalseQuestion[];
  essayQuestion: EssayQuestion[];
  mcQuestion: MCQuestion[];
  paragraphQuestions: ParagraphQuestion[];


  constructor() {
    this.code = '';
    this.title = '';
    this.startDate = null;
    this.endDate = null;
    this.note = '';
    this.trueOrFalseQuestion = new Array();
    this.mcQuestion = new Array();
    this.essayQuestion = new Array();
    this.paragraphQuestions = new Array();
    this.totalPoints = null;
    this.mcqTitle = null;
    this.trueOrFalseQuestionTitle = null;
    this.paragraphQuestionTitle = null;
    this.essayQuestionTitle = null;

  }
}