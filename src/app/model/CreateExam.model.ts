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

  endDate: Number;

  totalPoints: Number;
  trueOrFalseQuestion: TrueOrFalseQuestion[];
  essayQuestion: EssayQuestion[];
  mcQuestion: MCQuestion[];

  constructor() {
    this.code = '';
    this.title = '';
    this.startDate = null;
    this.endDate = null;
    this.note = '';
    this.trueOrFalseQuestion = new Array();
    this.mcQuestion = new Array();
    this.essayQuestion = new Array();
    this.totalPoints = null;

  }
}